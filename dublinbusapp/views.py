from django.shortcuts import render
from .serializers import StopsSerializer, RoutesSerializer, ShapesSerializer, TripsSerializer, NamesAndHeadsignsSerializer
from rest_framework import viewsets
from .models import Stops, Trips, Routes, Shapes, NamesAndHeadsigns

# Create your views here.
class StopsView(viewsets.ModelViewSet):
    serializer_class = StopsSerializer
    queryset = Stops.objects.all()

class ShapesView(viewsets.ModelViewSet):
    serializer_class = ShapesSerializer
    queryset = Shapes.objects.all()

class TripsView(viewsets.ModelViewSet):
    serializer_class = TripsSerializer
    queryset = Trips.objects.all()

class RoutesView(viewsets.ModelViewSet):
    serializer_class = RoutesSerializer
    queryset = Routes.objects.all()

class NamesAndHeadsignsView(viewsets.ModelViewSet):
    serializer_class = NamesAndHeadsignsSerializer
    queryset = NamesAndHeadsigns.objects.all()