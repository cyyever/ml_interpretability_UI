import threading
import time

import pytest
from cyy_naive_lib.log import get_logger
from cyy_private_torch_algorithm.lean_hydra.lean_hydra_config import \
    LeanHyDRAConfig
from cyy_torch_toolbox.data_structure.torch_process_task_queue import \
    TorchProcessTaskQueue
from cyy_torch_toolbox.ml_type import (MachineLearningPhase,
                                       ModelExecutorHookPoint)
from cyy_torch_toolbox.reproducible_env import global_reproducible_env


def __train_impl(config, extra_arguments):
    queue = extra_arguments["queue"]
    trainer = config.create_trainer()

    second_run = False

    def after_epoch_hook(**kwargs):
        if not second_run:
            return
        epoch = kwargs["epoch"]
        training_metric = trainer.performance_metric
        inference_metric = trainer.get_inferencer_performance_metric(
            phase=MachineLearningPhase.Validation
        )
        queue.put_result(
            {
                "epoch": epoch,
                "learning_rate": trainer.get_data("cur_learning_rates")[0],
                "training_loss": training_metric.get_loss(epoch),
                "validation_loss": inference_metric.get_loss(epoch),
                "training_acc": training_metric.get_accuracy(epoch),
                "validation_acc": inference_metric.get_accuracy(epoch),
            },
            queue_name="info",
        )

    trainer.append_named_hook(
        ModelExecutorHookPoint.AFTER_EPOCH,
        "gather_info",
        after_epoch_hook,
        stripable=True,
    )
    get_logger().info("begin train")
    trainer.train()

    global_reproducible_env.disable()
    previous_training_loss = {
        epoch: trainer.performance_metric.get_loss(epoch).cpu()
        for epoch in range(1, trainer.hyper_parameter.epoch + 1)
    }
    tester = trainer.get_inferencer(phase=MachineLearningPhase.Test, copy_model=True)
    tester.disable_logger()
    test_gradient = tester.get_gradient()
    global_reproducible_env.load_last_seed()
    global_reproducible_env.enable()
    trainer, hook = config.create_trainer_and_hook(test_gradient=test_gradient)
    # hook.set_computed_indices([1, 2])
    trainer.train()
    training_loss = {
        epoch: trainer.performance_metric.get_loss(epoch).cpu()
        for epoch in range(1, trainer.hyper_parameter.epoch + 1)
    }
    second_run = True

    for epoch in training_loss:
        assert pytest.approx(
            training_loss[epoch], previous_training_loss[epoch], abs=1e-6
        )

    get_logger().info("stop trainer")


__task_lock = threading.RLock()
__next_task_id = 0
__training_queues: dict = {}
__training_info: dict = {}


def training(
    dataset_name: str,
    model_name: str,
    epoch: int,
    learning_rate: float,
    lr_scheduler_name=None,
    optimizer_name=None,
) -> int:
    """Start a new training job and return the task id."""
    global __next_task_id
    config = LeanHyDRAConfig(dataset_name=dataset_name, model_name=model_name)

    if epoch is not None:
        config.hyper_parameter_config.epoch = epoch
    if learning_rate is not None:
        config.hyper_parameter_config.learning_rate = learning_rate
        config.hyper_parameter_config.find_learning_rate = False
    if lr_scheduler_name is not None:
        config.hyper_parameter_config.learning_rate_scheduler = lr_scheduler_name
    # if optimizer_name is not None:
    # config.hyper_parameter_config.optimizer_name = optimizer_name
    config.hyper_parameter_config.optimizer_name = "SGD"
    config.make_reproducible_env = True

    queue = TorchProcessTaskQueue(worker_num=1, use_manager=True, move_data_in_cpu=True)
    queue.add_result_queue(name="info")
    queue.set_worker_fun(__train_impl)
    queue.add_task(config)
    with __task_lock:
        task_id = __next_task_id
        __training_queues[task_id] = queue
        __training_info[task_id] = []
        __next_task_id += 1
        return task_id


def get_training_info(task_id: int) -> tuple:
    """Give task_id, return the loss & acc of model, and a flag indicating the training has finished"""
    with __task_lock:
        queue = __training_queues.get(task_id, None)
        if queue is not None:
            while queue.has_result(queue_name="info"):
                epoch_info = queue.get_result(queue_name="info")
                __training_info[task_id].append(epoch_info)
            if queue.has_result():
                queue.stop()
                del __training_queues[task_id]
                return (__training_info[task_id], True)
            return (__training_info[task_id], False)
        return (__training_info[task_id], True)


if __name__ == "__main__":
    task_id = training("MNIST", "lenet5", 1, 0.1)
    while True:
        time.sleep(10)
        print(get_training_info(task_id))
