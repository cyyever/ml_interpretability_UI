import threading
import time
import traceback

from cyy_naive_lib.log import get_logger
from cyy_torch_toolbox.data_structure.torch_process_task_queue import \
    TorchProcessTaskQueue
from cyy_torch_toolbox.default_config import DefaultConfig
from cyy_torch_toolbox.ml_type import (MachineLearningPhase,
                                       ModelExecutorHookPoint)


def __train_impl(config, extra_arguments):
    try:
        queue = extra_arguments["queue"]
        trainer = config.create_trainer()

        def after_epoch_hook(**kwargs):
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
            ModelExecutorHookPoint.AFTER_EPOCH, "gather_info", after_epoch_hook
        )
        trainer.train()
        get_logger().info("stop trainer")
        return
    except BaseException as e:
        get_logger().error("trainer has exception %s", e)
        get_logger().error("traceback:%s", traceback.format_exc())
        return


__task_lock = threading.RLock()
__next_task_id = 0
__training_queues: dict = {}
__training_info: dict = {}


def training(
    dataset_name: str, model_name: str, epoch: int, learning_rate: float
) -> int:
    """Start a new training job and return the task id."""
    global __next_task_id
    config = DefaultConfig(dataset_name=dataset_name, model_name=model_name)

    if epoch is not None:
        config.hyper_parameter_config.epoch = epoch
    if learning_rate is not None:
        config.hyper_parameter_config.learning_rate = learning_rate
        config.hyper_parameter_config.find_learning_rate = False

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
    task_id = training("MNIST", "lenet5", 10, 0.1)
    while True:
        time.sleep(10)
        print(get_training_info(task_id))
