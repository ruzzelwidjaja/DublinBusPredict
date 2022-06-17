from rest_framework import serializers
from .models import BusStation

# Whatever models we create 
class BusStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusStation
        fields = ('stop_id', 'stop_name', 'stop_lat', 'stop_lon')