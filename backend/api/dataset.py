import typing

from cyy_torch_toolbox.dataset_collection import DatasetCollection
from cyy_torch_toolbox.dataset_repository import get_dataset_constructors
from cyy_torch_toolbox.ml_type import MachineLearningPhase


class Dataset:
    dataset_collections: dict = {}

    @classmethod
    def get_supported_dataset_names(cls) -> typing.Sequence[str]:
        return sorted(get_dataset_constructors().keys(), key=str.casefold)

    @classmethod
    def get_dataset_collection(cls, name: str) -> DatasetCollection:
        if name not in cls.dataset_collections:
            cls.dataset_collections[name] = DatasetCollection.get_by_name(name)
        return cls.dataset_collections[name]

    @classmethod
    def get_label_indices(cls, name: str, phase: MachineLearningPhase) -> dict:
        labels = (
            cls.get_dataset_collection(name)
            .get_dataset_util(phase=phase)
            .split_by_label()
        )
        return {k: v["indices"] for k, v in labels.items()}

    @classmethod
    def get_label_names(cls, name: str) -> dict:
        return dict(enumerate(cls.get_dataset_collection(name).get_label_names()))

    @classmethod
    def get_raw_data_from_dataset(
        cls, name: str, phase: MachineLearningPhase, index: int
    ) -> tuple:
        return cls.get_dataset_collection(name).get_raw_data(phase, index)

    @classmethod
    def generate_raw_data_from_dataset(
        cls, name: str, phase: MachineLearningPhase
    ) -> typing.Sequence[tuple]:
        return cls.get_dataset_collection(name).generate_raw_data(phase)


""" test driver"""

# if __name__ == "__main__":
#    print(dataset.get_label_names("CIFAR10"))
#    print(list(dataset.get_label_indices("CIFAR10" , 1)))
#    labels = dataset.get_label_indices("CIFAR10", 1)[2]
#    print(labels)
#    dataset_ = dataset.get_label_indices(dataset.get_dataset_collection("CIFAR10"),1)
#    indexes = dataset_.get("9")
#    return_data = []
#    for x in list(indexes):
#        result = list(dataset.get_raw_data_from_dataset(dataset.get_dataset_collection("CIFAR10") , 1, x))
#        return_data.append(result)
