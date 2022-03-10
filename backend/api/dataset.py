import typing

from cyy_torch_toolbox.dataset_collection import DatasetCollection
from cyy_torch_toolbox.dataset_repository import get_dataset_constructors
from cyy_torch_toolbox.ml_type import DatasetType, MachineLearningPhase


class Dataset:
    dataset_collections: dict = {}

    @classmethod
    def get_supported_dataset_names(cls) -> dict:
        dataset_names = {}
        for dataset_type in (DatasetType.Vision, DatasetType.Text):
            dataset_names[str(dataset_type).lower()] = list(
                sorted(
                    get_dataset_constructors(dataset_type=dataset_type).keys(),
                    key=str.casefold,
                )
            )
        return dataset_names

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


# """ test driver"""

if __name__ == "__main__":
    labels = Dataset.get_label_indices("MNIST", MachineLearningPhase.Training)
    print(labels.keys())
    indexes = labels.get(9)
    return_data = []
    for x in list(indexes):
        result = list(
            Dataset.get_raw_data_from_dataset("MNIST", MachineLearningPhase.Training, x)
        )
        return_data.append(result)
    print(Dataset.get_raw_data_from_dataset("IMDB", MachineLearningPhase.Training, 1))
