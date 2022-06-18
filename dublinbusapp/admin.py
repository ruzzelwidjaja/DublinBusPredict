from django.contrib import admin
from .models import Stops

# Register your models here.
class StopsAdmin(admin.ModelAdmin):
    list = ('stop_id', 'stop_name', 'stop_lat', 'stop_lon')

admin.site.register(Stops, StopsAdmin)