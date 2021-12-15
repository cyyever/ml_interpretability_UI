#!/usr/bin/env python3

from cyy_torch_toolbox.dataset_collection import DatasetCollection
from cyy_torch_toolbox.ml_type import MachineLearningPhase


def test_dataset():
    mnist = DatasetCollection.get_by_name("MNIST")
    assert next(mnist.generate_raw_data(MachineLearningPhase.Training))
