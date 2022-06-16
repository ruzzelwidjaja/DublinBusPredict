from django.shortcuts import render
from .serializers import BusStationSerializer
from rest_framework import viewsets
from .models import BusStation

# Create your views here.
class BusStationView(viewsets.ModelViewSet):
    serializer_class = BusStationSerializer
    queryset = BusStation.objects.all()