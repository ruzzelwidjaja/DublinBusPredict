from time import time
from django.shortcuts import render
from .serializers import StopsSerializer
from rest_framework import viewsets
from .models import Stops
from django.http import JsonResponse, HttpResponse
from sklearn.ensemble import RandomForestRegressor
from datetime import datetime
import pandas as pd
import pickle
import os

# Create your views here.
class StopsView(viewsets.ModelViewSet):
    serializer_class = StopsSerializer
    queryset = Stops.objects.all()

def predict(request, line_id, journey_distance):
    # line_id: the short name of the bus route (e.g. "46A")
    # distance: distance of the bus journey

    try:
        # # # STEP ONE: GETTING INITIAL PREDICTION FOR THE COMPLETE JOURNEY FROM START OF LINE TO END OF LINE # # #
        # Load the relevant random forest model
        # TODO figure out loading from folder
        line_id = str(line_id)
        line_id = line_id.upper()
        module_dir = os.path.dirname(__file__)  # get current directory
        file_name = line_id + ".pkl"
        dir_path = os.path.join(module_dir, "forests")
        file_path = os.path.join(dir_path, file_name)
        with open(file_path, 'rb') as forest_file:
            forest = pickle.load(forest_file)

        # # dummy value for now, can be fed in at a later date
        temp = 20
        now = datetime.now()
        month = now.month
        day = now.weekday()
        dep_time = (now - now.replace(hour=0, minute=0, second=0, microsecond=0)).total_seconds()
        dep_time = (dep_time//1800)%48        

        # Arranging the input data for feeding into the random forest model
        input_data = [[temp, month, day, dep_time]]
        # Getting the predicted total journey time for the given input data
        total_time = forest.predict(input_data)
        total_time = int(total_time[0])

        # # # STEP TWO: CALCULATING THE PARTIAL JOURNEY TIME BASED ON ORIGIN & DESTINATION STOPS # # #
        # Loading the proportional dictionary
        distance_file = os.path.join(dir_path,"line_distances.pkl")
        with open(distance_file, 'rb') as fin:
            dist_proportions = pickle.load(fin)
        # getting the total distance for a route
        line_distance = dist_proportions[line_id]
        # calculating the proportional journey time
        journey_proportion = journey_distance / line_distance
        journey_time = int(journey_proportion * total_time)

        # journey_time = 20 # dummy value

        return JsonResponse({'journey_time': journey_time})
    except:
        # Status 500: "Internal Server Error" (i.e. Server encountered something making it unable to fulfill request)
        # possible exceptions: line id doesn't have relevant random forest model
        return HttpResponse(status=500)