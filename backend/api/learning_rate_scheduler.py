import typing

from cyy_torch_toolbox.hyper_parameter import HyperParameter


def get_supported_learning_rate_scheduler_names() -> typing.Sequence[str]:
    return sorted(HyperParameter.get_lr_scheduler_names(), key=str.casefold)
