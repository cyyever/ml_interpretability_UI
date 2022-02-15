import threading
import time

import pytest
from cyy_naive_lib.log import get_logger
from cyy_private_torch_algorithm.lean_hydra.lean_hydra_config import \
    LeanHyDRAConfig
from cyy_torch_toolbox.data_structure.torch_process_task_queue import \
    TorchProcessTaskQueue
from cyy_torch_toolbox.default_config import DefaultConfig
from cyy_torch_toolbox.ml_type import (MachineLearningPhase,
                                       ModelExecutorHookPoint)
from cyy_torch_toolbox.reproducible_env import global_reproducible_env


def __train_impl(task, extra_arguments):
    config, use_hydra = task
    queue = extra_arguments["queue"]

    def after_epoch_hook(**kwargs):
        trainer = kwargs["model_executor"]
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

    # config.make_reproducible_env = False
    if use_hydra:
        config.make_reproducible_env = True
    trainer = config.create_trainer()
    lr = trainer.hyper_parameter.get_learning_rate(trainer)
    config.hyper_parameter_config.learning_rate = lr
    config.hyper_parameter_config.find_learning_rate = False
    global_reproducible_env.disable()
    trainer = config.create_trainer()

    get_logger().info("begin train")

    if use_hydra:
        trainer.train()
        global_reproducible_env.disable()
        previous_training_loss = {
            epoch: trainer.performance_metric.get_loss(epoch).cpu()
            for epoch in range(1, trainer.hyper_parameter.epoch + 1)
        }
        tester = trainer.get_inferencer(
            phase=MachineLearningPhase.Test, copy_model=True
        )
        tester.disable_logger()
        test_gradient = tester.get_gradient()
        global_reproducible_env.load_last_seed()
        global_reproducible_env.enable()
        trainer, hook = config.create_trainer_and_hook(test_gradient=test_gradient)
        trainer.append_named_hook(
            ModelExecutorHookPoint.AFTER_EPOCH,
            "gather_info",
            after_epoch_hook,
            stripable=True,
        )
        trainer.train()
        training_loss = {
            epoch: trainer.performance_metric.get_loss(epoch).cpu()
            for epoch in range(1, trainer.hyper_parameter.epoch + 1)
        }

        for epoch in training_loss:
            assert training_loss[epoch] == pytest.approx(
                previous_training_loss[epoch], abs=1e-6
            )
        queue.put_result(
            {"contribution": hook.contributions.cpu().tolist()},
            queue_name="contribution",
        )
    else:
        trainer.append_named_hook(
            ModelExecutorHookPoint.AFTER_EPOCH,
            "gather_info",
            after_epoch_hook,
            stripable=True,
        )
        trainer.train()

    get_logger().info("stop trainer")
    return True


__task_lock = threading.RLock()
__next_task_id = 0
__training_queues: dict = {}
__training_info: dict = {}
__contribution: dict = {}


def training(
    dataset_name: str,
    model_name: str,
    epoch: int,
    learning_rate: float,
    use_hydra: bool,
    lr_scheduler_name=None,
    optimizer_name=None,
) -> int:
    """Start a new training job and return the task id."""
    global __next_task_id
    if use_hydra:
        config = LeanHyDRAConfig(dataset_name=dataset_name, model_name=model_name)
    else:
        config = DefaultConfig(dataset_name=dataset_name, model_name=model_name)

    if epoch is not None:
        config.hyper_parameter_config.epoch = epoch
    if learning_rate is not None:
        config.hyper_parameter_config.learning_rate = learning_rate
        config.hyper_parameter_config.find_learning_rate = False
    if lr_scheduler_name is not None:
        config.hyper_parameter_config.learning_rate_scheduler = lr_scheduler_name
    if optimizer_name is not None and not use_hydra:
        config.hyper_parameter_config.optimizer_name = optimizer_name
    else:
        config.hyper_parameter_config.optimizer_name = "SGD"

    queue = TorchProcessTaskQueue(worker_num=1, use_manager=True, move_data_in_cpu=True)
    queue.add_result_queue(name="info")
    queue.add_result_queue(name="contribution")
    queue.set_worker_fun(__train_impl)
    queue.add_task((config, use_hydra))
    with __task_lock:
        task_id = __next_task_id
        __training_queues[task_id] = queue
        __training_info[task_id] = []
        __contribution[task_id] = []
        __next_task_id += 1
        return task_id


def get_training_info(task_id: int) -> tuple:
    """Give task_id, return the loss & acc of model, contribution and a flag indicating the training has finished"""
    with __task_lock:
        queue = __training_queues.get(task_id, None)
        finish_flag = True
        if queue is not None:
            finish_flag = False
            while queue.has_result(queue_name="info"):
                epoch_info = queue.get_result(queue_name="info")
                __training_info[task_id].append(epoch_info)
            if queue.has_result(queue_name="contribution"):
                __contribution[task_id].append(
                    queue.get_result(queue_name="contribution")
                )
            if queue.has_result():
                queue.release()
                del __training_queues[task_id]
                finish_flag = True
        return (
            __training_info[task_id],
            __contribution.get(task_id, None),
            finish_flag,
        )


def remove_training_task(task_id):
    __training_queues.pop(task_id, None)
    __training_info.pop(task_id, None)
    __contribution.pop(task_id, None)


if __name__ == "__main__":
    task_id = training("MNIST", "lenet5", 1, 0.1, use_hydra=True)
    while True:
        time.sleep(1)
        info, contribution, flag = get_training_info(task_id)
        if flag:
            break
