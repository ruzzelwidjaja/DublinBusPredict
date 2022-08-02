"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from dublinbusapp.models import FavoriteStops
from rest_framework import routers
from dublinbusapp import views
from rest_framework_jwt.views import obtain_jwt_token
router = routers.DefaultRouter()
router.register(r'stops', views.StopsView, 'stops')
router.register(r'todos', views.TodoView, 'todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path("accounts/", include("django.contrib.auth.urls")),
    path('token-auth/', obtain_jwt_token),
    path('core/', include('dublinbusapp.urls')), # new
    path('fav_stops/<str:user_id>/',views.FavoriteStopsView.as_view())
]