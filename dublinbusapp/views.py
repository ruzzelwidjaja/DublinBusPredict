from django.shortcuts import render
from .serializers import StopsSerializer
from rest_framework import viewsets
from .models import Stops
from django.http import JsonResponse

# Create your views here.
class StopsView(viewsets.ModelViewSet):
    serializer_class = StopsSerializer
    queryset = Stops.objects.all()

def predict(request,line_id):
    return JsonResponse({'prediction': 'testing json'})