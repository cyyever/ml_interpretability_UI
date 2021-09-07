import typing

from cyy_torch_toolbox.dataset_collection import DatasetCollection


def get_supported_dataset_names() -> typing.Sequence[str]:
    return DatasetCollection.get_dataset_constructors().keys()


def get_dataset_collection(name: str) -> DatasetCollection:
    return DatasetCollection.get_by_name(name)
