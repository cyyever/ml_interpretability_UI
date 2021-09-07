from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework import views
from rest_framework import status
from .serializers import DataSerializer
from django.core.files.storage import default_storage 
import zipfile 

# Create your views here.

class FileUploadView(views.APIView):
    parser_classes = [FileUploadParser, ]

    def post(self, request, filename , format=None):
        file_obj = request.data['file']
        file_name = default_storage.save(file_obj.name, file_obj)
          
        return Response(status=200)

'''
class FileView(APIView):
  parser_classes = (MultiPartParser, FormParser)

  def post(self, request, *args, **kwargs):
    file_serializer = FileSerializer(data=request.data)
    if file_serializer.is_valid():
      file_serializer.save()
      return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      '''