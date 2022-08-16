from django.contrib import admin
from .models import Stops, FavoriteStops, Todo, Trips, Shapes, Routes, NamesAndHeadsigns
from dublinbusapp.models import Account1
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

# Register your models here.
class StopsAdmin(admin.ModelAdmin):
    list = ('stop_id', 'stop_name', 'stop_lat', 'stop_lon')

class FavoriteStopsAdmin(admin.ModelAdmin):
    list = ('user_id', 'user_id')

class AccountInline(admin.StackedInline):
    model = Account1
    can_delete = False
    verbose_name_plural = 'Accounts1'

class CustomizedUserAdmin (UserAdmin):
    inlines = (AccountInline, )

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')


class TripAdmin(admin.ModelAdmin):
    list = ('route', 'service_id', 'trip_id', 'shape', 'trip_headsign', 'direction_id')
    
class ShapeAdmin(admin.ModelAdmin):
    list = ('shape_id', 'shape_pt_lat', 'shape_pt_lon', 'shape_pt_sequence', 'shape_dist_traveled')

class RouteAdmin(admin.ModelAdmin):
    list = ('route_id', 'agency_id', 'route_short_name', 'route_long_name', 'route_type')

class NamesAndHeadsignAdmin(admin.ModelAdmin):
    list = ('route_short_name', 'route_id', 'trip_headsign', 'shape_id')

# Register your models here.

admin.site.register(Todo, TodoAdmin)

admin.site.register(Stops, StopsAdmin)
admin.site.register(FavoriteStops,FavoriteStopsAdmin)

admin.site.unregister(User)
admin.site.register(User, CustomizedUserAdmin)

admin.site.register(Account1)

admin.site.register(Trips, TripAdmin)
admin.site.register(Shapes, ShapeAdmin)
admin.site.register(Routes, RouteAdmin)
admin.site.register(NamesAndHeadsigns, NamesAndHeadsignAdmin)
