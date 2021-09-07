import typing

from cyy_torch_toolbox.dataset_collection import DatasetCollection
from cyy_torch_toolbox.ml_type import DatasetType, MachineLearningPhase


def get_supported_dataset_names() -> typing.Sequence[str]:
    return DatasetCollection.get_dataset_constructors().keys()


def get_dataset_collection(name: str) -> DatasetCollection:
    return DatasetCollection.get_by_name(name)


def list_data(dc: DatasetCollection, phase: MachineLearningPhase):
    if dc.dataset_type == DatasetType.Vision:
        dataset_util = dc.get_dataset_util(phase)
        for i in range(len(dataset_util)):
            yield (dataset_util.get_sample_image(i), dataset_util.get_sample_label(i))
        return
    raise RuntimeError("Unimplemented Code")
