import typing

from cyy_torch_toolbox.model_factory import get_model_info


def get_supported_model_names() -> typing.Sequence[str]:
    return sorted(get_model_info().keys(), key=str.casefold)
