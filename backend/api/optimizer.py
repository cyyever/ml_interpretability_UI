import typing

from cyy_torch_toolbox.hyper_parameter import HyperParameter


def get_supported_optimizer_names() -> typing.Sequence[str]:
    return sorted(HyperParameter.get_optimizer_names(), key=str.casefold)
