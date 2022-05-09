import typing

from cyy_torch_toolbox.model_factory import get_model_info


def get_supported_model_names() -> typing.Sequence[str]:
    model_names = [info[0] for info in get_model_info().values()]
    return sorted(model_names, key=str.casefold)
