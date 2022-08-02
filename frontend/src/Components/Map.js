import React, { useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  Polyline,
  Marker,
  Geometry
} from "@react-google-maps/api";
import MapStyles from "./MapStyles";
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
  shapes,
  mapLoaded,
  setMapLoaded,
  stops,
}) => {
  var markers = [];
  const [map, setMap] = useState(null);  
  const mapRef = React.useRef();
  // const onMapLoad = React.useCallback((map) => {
  mapRef.current = map;
  const google = window.google

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
     
    lat = 53.339665308
    lng = -6.23749905
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
  // var point = { lat, lng }
  var point = new google.maps.LatLng(lat,lng);
  
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

      var
  searchArea,
  searchAreaMarker,
  searchAreaRadius = 500, // metres
  startLat = 40.782827,
  startLng = -73.966167;

      searchArea = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        map: map,
        center: point,
        radius: searchAreaRadius
      });
      console.log(markers)
      for (var i = 0; i < stops.length; i++) {
        // console.log('Marker: , position: ' + stops[i].getPosition());
        // console.log("marker["+i+"] posn="+stops[i].markers.getPosition().toUrlValue(6));
        // console.log(markers[i].getPosition())
        // console.log(searchArea.getCenter())
        
        var distance
        var c = 0;
        while (c < stops.length){
          var location = stops[c];
          // console.log(location)
          var locationlatlng = new google.maps.LatLng(location.stop_lat,location.stop_long);
          // console.log(location.stop_lat,location.stop_long)

          var _kCord = new google.maps.LatLng(-36.874694, 174.735292);
          var _pCord = new google.maps.LatLng(-36.858317, 174.782284);
          // distance = new google.maps.geometry.spherical.computeDistanceBetween(point, locationlatlng);
          distance = google.maps.geometry.spherical.computeDistanceBetween(point, locationlatlng)
          
          if (distance <= searchAreaRadius) {
            html = location.stop_name;
            var new_marker = new google.maps.Marker({
              position: locationlatlng,
              map: map,


              
            });
            var infoWindow = new google.maps.InfoWindow();
            google.maps.event.addListener(new_marker, 'click', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
      })

          }





          // console.log(distance);  // popup box says "[object, Object]"
          c++;
      }

        // if (google.maps.geometry.spherical.computeDistanceBetween(markers[i].getPosition(), point) <= searchAreaRadius) {
        //   console.log('=> is in searchArea');
        // }
        // else{
        //   console.log('Not in')
        // }








  };
}
  var state = true;
  
  
  function setMapOnAll() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
    

  }
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
    
    console.log('here 2',stops);
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
        var displayInfo = "<h3>" + stops1[key].stop_name + "</br>" + "</h3>Bikes Available : ";
        

        // Generate infoWindow
        
        // console.log(lat)
        var location_place = {lat:parseFloat(lat), lng:parseFloat(log)};
        var infoWindow = new google.maps.InfoWindow();
        // console.log('Inside the maps')
      }

      var marker = new google.maps.Marker({
        position: location_place,
        map: map,
          });
          // markerCluster.addMarker(markerAll);
          // Ruzzel code, here




      // makeClickable(map, marker, displayInfo);
      
      markers.push(marker);
      
          var html = stop;
      
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        map.panTo(this.getPosition());
        
      })
      }
      // var markerClusterer = new MarkerClusterer({map, markers})
     
      // var markerCluster = new MarkerClusterer.MarkerClusterer({ map, markers });
      state = false;
        return;
    }   
    }

    // function makeClickable(map, markers, info) {
    //   console.log('In the make clickable')
    //     var infowindow = new google.maps.InfoWindow({
    //         content: info
    //     });
    
    //     google.maps.event.addListener(marker, 'click', function (ev) {
    //         infowindow.setPosition();
    //         infowindow.open(map);
    //     });
    // }
    
  return ( 
    <div id='GoogleMap'>
    <Locate panTo={panTo} />
    <div>
    <button onClick={PanTo1} className='search'>Show stop locations</button>
    </div>
    <GoogleMap
      center={center}
        zoom={14}
        mapContainerStyle={mapContainerStyle}
        options={options}
        onLoad={(mapLoaded) => setMapLoaded(mapLoaded)}
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
        
        {shapes && (
          <>
            <Polyline
              options={{
                strokeColor: "#fbbf24",
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
              path={shapes}
            />
            <Marker position={shapes[0]} />
            <Marker position={shapes[shapes.length - 1]} />
          </>
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
