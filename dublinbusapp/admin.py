from django.contrib import admin
from .models import BusStation

# Register your models here.
class BusStationAdmin(admin.ModelAdmin):
    list = ('stop_id', 'stop_name', 'stop_lat', 'stop_lon')

admin.site.register(BusStation, BusStationAdmin)