from rest_framework import serializers
from .models import Stops, Shapes, Routes, Trips, NamesAndHeadsigns

# Whatever models we create 
class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stops
        fields = ('stop_id', 'stop_name', 'stop_lat', 'stop_long')

class RoutesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes
        fields = ('route_id', 'agency_id', 'route_short_name', 'route_long_name', 'route_type')

class ShapesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shapes
        fields = ('shape_id', 'shape_pt_lat', 'shape_pt_lon', 'shape_pt_sequence', 'shape_dist_traveled')

class TripsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trips
        fields = ('route_id', 'service_id', 'trip_id', 'shape_id', 'trip_headsign', 'direction_id')

class NamesAndHeadsignsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NamesAndHeadsigns
        fields = ['route_short_name', 'route_id', 'trip_headsign', 'shape_id']