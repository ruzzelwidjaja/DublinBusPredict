import React, { useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import ReactLoading from "react-loading";

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
      
      var html = 'CURRENT LOCATION';
      var infoWindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      })
  };
  // Function to pan the map down below route info
  // const panDown = (map, directions) => {
  //   map.panTo(directions);
  //   map.panBy(0, 20);
  // };

  return (
    <div id='GoogleMap'>
    <Locate panTo={panTo} />
    <GoogleMap
      center={center}
      zoom={14}
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
