import base64
from io import BytesIO

from data.dataset import dataset
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.


class DatasetNameView(APIView):
    def get(self, request):
        return Response({"datasetName": dataset.get_supported_dataset_names()})


class DatasetLabelView(APIView):
    def get(self, request):
        return_value = []
        datasetName = request.query_params["datasetName"]
        for key, value in dataset.get_label_names(datasetName).items():
            return_value.append({"value": key, "label": value})
        return Response({"datasetLabelName": return_value})


class DatasetLabelIndexView(APIView):
    def get(self, request):
        datasetName = request.query_params["datasetName"]
        datasetType = request.query_params["datasetType"]
        datasetLabel = request.query_params["datasetLabel"]
        labels = dataset.get_label_indices(datasetName, datasetType)[datasetLabel]
        return Response({"indices": list(labels)})


class RawDataView(APIView):
    def get(self, request):
        datasetName = request.query_params["datasetName"]
        datasetType = request.query_params["datasetType"]
        indices = request.query_params["indices"]

        return_data = []
        buffered = BytesIO()

        for index in indices:
            data = dataset.get_raw_data_from_dataset(datasetName, datasetType, index)
            data.save(buffered, format="JPEG")
            buffered.seek(0)
            img_str = base64.b64encode(buffered.getvalue())
            return_data.append(img_str.decode("UTF-8"))
        return Response(return_data)
