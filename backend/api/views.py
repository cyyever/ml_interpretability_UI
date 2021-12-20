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



class DatasetView(APIView):
  def get(self, request):
    datasetName = request.query_params['datasetName']
    dataset_ = dataset.get_raw_data_from_dataset(dataset.get_dataset_collection(datasetName) , 1)

    return_data = []
    buffered = BytesIO()
    for x in list(dataset_):
      x[0].save(buffered , format="JPEG")
      buffered.seek(0)
      img_str = base64.b64encode(buffered.getvalue())
      return_data.append({"img":  img_str.decode('UTF-8') ,"label" : x[1] })
    return Response(return_data)
    


