from django.urls import path

from .views import (Dataset_v2View, DatasetLabelIndexView, DatasetLabelView,
                    DatasetNameView)

urlpatterns = [
    path("api/datasetName", DatasetNameView.as_view(), name="dataset name"),
    path("api/datasetLabel", DatasetLabelView.as_view(), name="dataset label"),
    path("api/datasetLabelIndices", DatasetLabelIndexView.as_view(), name="dataset"),
    path("api/rawData", RawDataView.as_view(), name="dataset"),
]
