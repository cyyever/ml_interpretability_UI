#!/usr/bin/env python3

from cyy_torch_toolbox.dataset_collection import (
    ClassificationDatasetCollection, create_dataset_collection)
from cyy_torch_toolbox.ml_type import MachineLearningPhase


def test_dataset():
    mnist = create_dataset_collection(ClassificationDatasetCollection, "MNIST")
    assert next(mnist.generate_raw_data(MachineLearningPhase.Training))
