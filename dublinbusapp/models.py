from pyexpat import model
from django.db import models

# Create your models here.
class BusStation(models.Model):
    stop_id = models.CharField(max_length=100, primary_key=True)
    stop_name = models.CharField(max_length=100)
    stop_lat = models.FloatField()
    stop_lon = models.FloatField()
