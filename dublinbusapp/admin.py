from django.contrib import admin
from .models import Stops, Trips, Shapes, Routes, NamesAndHeadsigns

# Register your models here.
class StopsAdmin(admin.ModelAdmin):
    list = ('stop_id', 'stop_name', 'stop_lat', 'stop_lon')

class TripAdmin(admin.ModelAdmin):
    list = ('route', 'service_id', 'trip_id', 'shape', 'trip_headsign', 'direction_id')
    
class ShapeAdmin(admin.ModelAdmin):
    list = ('shape_id', 'shape_pt_lat', 'shape_pt_lon', 'shape_pt_sequence', 'shape_dist_traveled')

class RouteAdmin(admin.ModelAdmin):
    list = ('route_id', 'agency_id', 'route_short_name', 'route_long_name', 'route_type')

class NamesAndHeadsignAdmin(admin.ModelAdmin):
    list = ('route_short_name', 'route_id', 'trip_headsign', 'shape_id')

admin.site.register(Stops, StopsAdmin)
admin.site.register(Trips, TripAdmin)
admin.site.register(Shapes, ShapeAdmin)
admin.site.register(Routes, RouteAdmin)
admin.site.register(NamesAndHeadsigns, NamesAndHeadsignAdmin)