import typing

from cyy_torch_toolbox.dataset_collection import DatasetCollection
from cyy_torch_toolbox.ml_type import MachineLearningPhase


class dataset:
    def get_supported_dataset_names() -> typing.Sequence[str]:
        return DatasetCollection.get_dataset_constructors().keys()

    def get_dataset_collection(name: str) -> DatasetCollection:
        return DatasetCollection.get_by_name(name)

    def get_label_indices(dc: DatasetCollection, phase: MachineLearningPhase) -> dict:
        labels = dc.get_dataset_util(phase=phase).split_by_label()
        return {str(k): v["indices"] for k, v in labels.items()}

    def get_raw_data_from_dataset(
        dc: DatasetCollection, phase: MachineLearningPhase, index: int
    ) -> tuple:
        return dc.get_raw_data(phase, index)

    # def get_dataset_size(dc: DatasetCollection, phase: MachineLearningPhase):
    #     return len(dc.get_dataset(phase))

    # def generate_raw_data_from_dataset(
    #     dc: DatasetCollection, phase: MachineLearningPhase
    # ) -> typing.Sequence[tuple]:
    #     return dc.generate_raw_data(phase)


'''test code'''
#if __name__ == "__main__":
#    label =dataset.get_label_indices(dataset.get_dataset_collection("CIFAR10") , MachineLearningPhase.Training)
#    print(label.keys())
#    print(label.get(9))
#    print(list(dataset.get_raw_data_from_dataset(dataset.get_dataset_collection("CIFAR10") , MachineLearningPhase.Training , 46713)))
