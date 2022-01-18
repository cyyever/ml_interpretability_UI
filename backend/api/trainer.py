import threading

from cyy_naive_lib.data_structure.process_task_queue import ProcessTaskQueue
from cyy_torch_toolbox.default_config import DefaultConfig


def __train_impl(config):
    try:
        trainer = config.create_trainer()
        trainer.train()
        return True
    except BaseException:
        return False


__task_lock = threading.RLock()
__next_task_id = 0
__training_tasks = {}


def training(
    dataset_name: str, model_name: str, epoch: int, learning_rate: float
) -> int:
    """Start a new training job and return the task id."""
    global __task_lock
    global __training_tasks
    global __next_task_id
    config = DefaultConfig(dataset_name=dataset_name, model_name=model_name)

    if epoch is not None:
        config.hyper_parameter_config.set_epoch(epoch)
    if learning_rate is not None:
        config.hyper_parameter_config.set_learning_rate(learning_rate)

    queue = ProcessTaskQueue(worker_fun=__train_impl)
    queue.start()
    queue.add_task(config)
    with __task_lock:
        task_id = __next_task_id
        __training_tasks[task_id] = queue
        __next_task_id += 1
        return task_id


def get_training_info(task_id) -> bool:
    """Give  task_id, return the loss & acc of model, and a flag indicating the training has finished"""
    global __task_lock
    pass
