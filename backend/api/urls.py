from django.urls import path
from django.conf.urls import url
from .views import DatasetNameView , DatasetLabelView , DatasetView

urlpatterns = [
   path('api/datasetName' , DatasetNameView.as_view() , name='dataset name'),
   path('api/datasetLabel' , DatasetLabelView.as_view() , name = 'dataset label'),
   path('api/dataset' , DatasetView.as_view() , name = 'dataset')
]