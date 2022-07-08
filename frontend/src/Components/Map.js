import React, { useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import ReactLoading from "react-loading";
import { MarkerClusterer } from "@googlemaps/markerclusterer";


const center = { lat: 53.3434634, lng: -6.2749724 };
const mapContainerStyle = { width: "100%", height: "100%" };
const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  clickableIcons: false,
};

const Map = ({
  setModalType,
  chosenIndex,
  directionsOutput,
  isLoaded,
  loadError,
  stops,
}) => {
  var markers = [];
  const [map, setMap] = useState(null);  
  const mapRef = React.useRef();
  // const onMapLoad = React.useCallback((map) => {
  mapRef.current = map;
  const google = window.google
  // Error loading Map
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  // If map has not loaded display loading..
  if (!isLoaded) {
    return (
      <div className="h-full w-full bg-zinc-900 ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ReactLoading type={"spin"} color="#475569" />
        </div>
        <div className="text-center absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-slate-500">Loading..</p>
        </div>
      </div>
    );
  }
  console.log("STOPS:", stops)
  // Function to select route index
  const selectRouteIndex = () => {
    // Choose 0 unless another index specified
    if (chosenIndex) {
      return parseInt(chosenIndex);
    }
    return 0;
  };
const panTo = (lat, lng) => {
    console.log("lat,lng")
    // find_closest_marker(lat,lng)


    console.log('here 2',lat,lng);
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    var circle = new google.maps.Circle({
      strokeColor: 'Blue',
      strokeOpacity: '0.8',
      strokeWeight: 0,
      fillColor: 'Blue',
      fillOpacity: 0.55,
      map,
      radius: 175,
      clickable: true,
      center: {
          lat: lat,
          lng: lng
      },
  })
  var point = { lat, lng }
  var marker = new google.maps.Marker({
    position: point,
    map: map
      });
      setMapOnAll()
      var html = 'CURRENT LOCATION';
      var infoWindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      })
  };
  var state = true;

  function setMapOnAll() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }



var state = true;
  const PanTo1 = () => {

   

    
    console.log('ELSE')
      // stuff for 'stop' action
      if (state == false) {
        // stuff for 'playnow' action
        setMapOnAll()
        state = true;
        return;
    }

    else {
        // stuff for 'stop' action

        
      






    var stops1 = stops
<<<<<<< HEAD
    var markers = [];
    // console.log('here 2',stops);
=======
    
    console.log('here 2',stops);
>>>>>>> 5e6ed6133b76dae375efbf070c203acd125fe5d6
    // const [map, setMap] = useState(null);
    const google = window.google
    // Code for referencing the map
    // const mapRef = React.useRef();
    // // const onMapLoad = React.useCallback((map) => {
    // mapRef.current = map;
    // mapRef.current.panTo({ lat, lng });
    // mapRef.current.setZoom(14);
    // console.log(stops)
    
    for (var key in stops1) {
      if (stops1.hasOwnProperty(key)) {
        
        var stop = stops1[key].stop_name
        var lat = stops1[key].stop_lat;
        var log = stops1[key].stop_long;
        // console.log(lat)
        var location_place = {lat:parseFloat(lat), lng:parseFloat(log)};
        var infoWindow = new google.maps.InfoWindow();
        // console.log('Inside the maps')
      }

      var marker = new google.maps.Marker({
        position: location_place,
        map: map,
          });
      markers.push(marker);
          var html = stop;
      
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        map.panTo(this.getPosition());
        
      })
      }
      state = false;
        return;
    }   
    }
    

    const PanTo2 = () => {
      
      // Stops data
      var stops2 = stops
      var locations = []
      var stopsDict = []

      for (var key in stops2) {
        if (stops2.hasOwnProperty(key)) {
          // console.log(json)
    
          var stop = stops2[key].stop_name
          var lat = stops2[key].stop_lat;
          var lng = stops2[key].stop_long;
    
          var pos = {lat: lat, lng: lng}
          locations.push(pos)
          stops.push(stop)
          
          var infoWindow = new google.maps.InfoWindow();

          //PanTo1(lat,log,stop);
          
          // console.log(stops2[key].stop_lng)
          // console.log('Inside the maps')
        }
        }
      
      // Add some markers to the map.
      const markers = locations.map((position, i) => {
        const stop = stopsDict[i];
        const marker = new google.maps.Marker({
          position,
          stop,
        });
    
        // markers can only be keyboard focusable when they have click listeners
        // open info window when marker is clicked
        marker.addListener("click", () => {
          infoWindow.setContent(stop);
          infoWindow.open(map, marker);
        });
        return marker;
      });
    
      // Add a marker clusterer to manage the markers.
      new MarkerClusterer({ markers, map });
    }









  // Function to pan the map down below route info
  // const panDown = (map, directions) => {
  //   map.panTo(directions);
  //   map.panBy(0, 20);
  // };

  return (
    <div id='GoogleMap'>
    <Locate panTo={panTo} />
    <div>
    <button onClick={PanTo2} className='search'>Show stop locations</button>
    </div>
    <GoogleMap
      
      center={center}
      zoom={8}
      mapContainerStyle={mapContainerStyle}
      options={options}
      onLoad={(map) => {
        setMap(map);
      }}
      
      onClick={() => {
        setModalType("CLOSED");
      }}
    >
      {directionsOutput && (
        <DirectionsRenderer
          options={{
            suppressMarkers: true,
            suppressInfoWindows: true,
            polylineOptions: { strokeColor: "#d97706" },
          }}
          directions={directionsOutput}
          routeIndex={selectRouteIndex()}
        />
      )}
    </GoogleMap>
    </div>
  );
};
function Locate({ panTo }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  // 
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          
          (position) => {
            console.log(position.coords.latitude)
            var lat = position.coords.latitude;
            var lng =  position.coords.longitude
            panTo(lat,lng);
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

export default Map;
