from django.urls import path

from .views import (RawDataView, DatasetLabelIndexView, DatasetLabelView, getModalView ,
                    DatasetNameView)

urlpatterns = [
    path("api/datasetName", DatasetNameView.as_view(), name="dataset name"),
    path("api/datasetLabel", DatasetLabelView.as_view(), name="dataset label"),
    path("api/datasetLabelIndices", DatasetLabelIndexView.as_view(), name="dataset"),
    path("api/rawData", RawDataView.as_view(), name="dataset"),
    path("api/getModal" ,getModalView.as_view(), name = "model name"),
]
