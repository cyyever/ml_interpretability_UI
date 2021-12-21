from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework import views
from rest_framework import status
from django.core.files.storage import default_storage 


from data.dataset import dataset
import base64
from io import BytesIO
# Create your views here.


class DatasetNameView(APIView):
  def get(self , request):
    return Response({"datasetName":dataset.get_supported_dataset_names()})


class DatasetLabelView(APIView):
  def get(self, request):
    datasetName = request.query_params['datasetName']
    dataset_ = dataset.get_label_indices(dataset.get_dataset_collection(datasetName),1)
    labels = list(dataset_.keys())
    labels.sort()
    return Response({"datasetLabel" : labels})

class DatasetView(APIView):
  def get(self, request):
    datasetName = request.query_params['datasetName']
    label = request.query_params['label']
    dataset_ = dataset.get_label_indices(dataset.get_dataset_collection(datasetName),1)
    indexes = dataset_.get(label)
    return_data = []
    buffered = BytesIO()
    for x in list(indexes):
      result = list(dataset.get_raw_data_from_dataset(dataset.get_dataset_collection(datasetName) , 1, x))
      result[0].save(buffered , format="JPEG")
      buffered.seek(0)
      img_str = base64.b64encode(buffered.getvalue())
      return_data.append({"img":  img_str.decode('UTF-8') ,"label" : label })
    return Response(return_data)
    


