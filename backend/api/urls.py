from django.urls import path

from .views import (RawDataView, DatasetLabelIndexView, DatasetLabelView, getModelView ,
                    DatasetNameView ,startRunModelView , getModelResultView)

urlpatterns = [
    path("api/datasetName", DatasetNameView.as_view(), name="dataset name"),
    path("api/datasetLabel", DatasetLabelView.as_view(), name="dataset label"),
    path("api/datasetLabelIndices", DatasetLabelIndexView.as_view(), name="dataset"),
    path("api/rawData", RawDataView.as_view(), name="dataset"),
    path("api/getModel" ,getModelView.as_view(), name = "model name"),
    path("api/startRunModel" ,startRunModelView.as_view(), name = "start model"),
    path("api/getModelResult" ,getModelResultView.as_view(), name = "get model result "),
]
