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
        dc = dataset.get_dataset_collection(datasetName)
        for key , value in dataset.get_label_names(dc).items():
            return_value.append({"value" : key , "label" : value})
        return Response({"datasetLabelName": return_value})


class DatasetView(APIView):
    def get(self, request):
        datasetName = request.query_params["datasetName"]
        label = request.query_params["datasetLabel"]
        dataset_ = dataset.get_label_indices(
            dataset.get_dataset_collection(datasetName), 1
        )
        indexes = dataset_.get(label)
        return_data = []
        buffered = BytesIO()
        for x in list(indexes):
            result = list(
                dataset.get_raw_data_from_dataset(
                    dataset.get_dataset_collection(datasetName), 1, x
                )
            )
            result[0].save(buffered, format="JPEG")
            buffered.seek(0)
            img_str = base64.b64encode(buffered.getvalue())
            return_data.append({"img": img_str.decode("UTF-8"), "label": label})
        return Response(return_data)


class Dataset_v2View(APIView):
    def get(self, request):
        datasetName = request.query_params["datasetName"]
        datasetLabel = request.query_params["datasetLabel"]
        datasetType = request.query_params["datasetType"]
        
        dc = dataset.get_dataset_collection(datasetName)
        labels =  dataset.get_label_names(dc)
        dataset_ = dataset.generate_raw_data_from_dataset(
           dc, int(datasetType)
        )

        return_data = []
        buffered = BytesIO()

        for x in list(dataset_):
            if str(x[1]) == str(datasetLabel):
                x[0].save(buffered, format="JPEG")
                buffered.seek(0)
                img_str = base64.b64encode(buffered.getvalue())
                return_data.append({"img": img_str.decode("UTF-8"), "label": labels[x[1]]})
        return Response(return_data)
