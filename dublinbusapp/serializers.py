from rest_framework import serializers
from .models import Stops

# Whatever models we create 
class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stops
        fields = ('stop_id', 'stop_name', 'stop_lat', 'stop_long')