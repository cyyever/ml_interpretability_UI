import typing

from cyy_torch_toolbox.dataset_collection import DatasetCollection
from cyy_torch_toolbox.ml_type import MachineLearningPhase


def get_supported_dataset_names() -> typing.Sequence[str]:
    return DatasetCollection.get_dataset_constructors().keys()


def get_dataset_collection(name: str) -> DatasetCollection:
    return DatasetCollection.get_by_name(name)


def get_raw_data_from_dataset(
    dc: DatasetCollection, phase: MachineLearningPhase
) -> typing.Sequence[tuple]:
    return dc.generate_raw_data(phase)
