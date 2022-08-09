import React, { useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  Polyline,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import Switch from "react-switch";
import location_icon from "../Assets/locationIcon.gif";
import WeatherIcon from "./WeatherIcon";

<script src="https://maps.googleapis.com/maps/api/js?v=3&sensor=false&libraries=geometry"></script>;

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
  //mapLoaded,
  //setMapLoaded,
  stops,
  isLoaded,
  loadError,
  modalType,
}) => {
  var markers = [];
  const [mapLoaded, setMapLoaded] = useState(null);
  const mapRef = React.useRef();
  // const onMapLoad = React.useCallback((map) => {
  mapRef.current = mapLoaded;
  const google = window.google;

  // Marker InfoWindow
  const [activeMarker, setActiveMarker] = useState(null);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // console.log("STOPS1:", stops)

  // Dictionary for markers

  const stops2 = stops.map(({ stop_id, stop_name, stop_lat, stop_long }) => ({
    id: stop_id,
    name: stop_name,
    lat: stop_lat,
    lng: stop_long,
    position: { lat: stop_lat, lng: stop_long },
  }));
  // console.log("STOPS1/2:", stops2)

  for (var key in stops2) {
    var location = {
      lat: parseFloat(stops2[key].lat),
      lng: parseFloat(stops2[key].lng),
    };
    // eslint-disable-next-line no-undef
    stops2[key].position = new google.maps.LatLng(location);
  }
  // console.log("STOPS2:", stops2)

  // Marker Clusterer toggle
  const [clusterer, setClusterer] = useState(false);

  const clusterToggler = () => {
    clusterer ? setClusterer(false) : setClusterer(true);
  };

  // Geolocation Toggle
  const [geolocatorToggle, setGeolocator] = useState(false);

  const geolocatorToggler = () => {
    geolocatorToggle ? setGeolocator(false) : setGeolocator(true);
  };

  // Function to select route index
  const selectRouteIndex = () => {
    // Choose 0 unless another index specified
    if (chosenIndex) {
      return parseInt(chosenIndex);
    }
    return 0;
  };

  var state = true;

  function setMapOnAll() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  function isMarkerInArea(circle, latLngPos) {
    return circle.getBounds().contains(latLngPos);
  }

  const panTo = (lat, lng) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);

    var stopsInArea = [];
    var searchAreaRadius = 500; // metres

    // eslint-disable-next-line no-undef
    var location = new google.maps.LatLng(lat, lng);

    const circle_icon = {
      url: location_icon, // url
      // eslint-disable-next-line no-undef
      scaledSize: new google.maps.Size(50, 50), // scaled size
      // eslint-disable-next-line no-undef
      origin: new google.maps.Point(0, 0), // origin
    };
    // eslint-disable-next-line no-undef
    var circleArea = new google.maps.Circle({
      strokeOpacity: 0,
      strokeWeight: 0,
      fillOpacity: 0,
      map: mapLoaded,
      center: location,
      radius: searchAreaRadius,
    }); // if overlapping, remove options to make the circle blank

    // Add markers that are in circle area to stopsInArea
    for (var key in stops2) {
      if (isMarkerInArea(circleArea, stops2[key].position)) {
        stopsInArea.push({
          id: stops2[key].id,
          name: stops2[key].name,
          position: stops2[key].position,
        });
      }
    }

    console.log("TEST:", stopsInArea);
    // eslint-disable-next-line no-undef
    const loc = new google.maps.Marker({
      position: location,
      mapLoaded,
      icon: circle_icon,
    });

    loc.setMap(mapLoaded);

    console.log("TESTSTS", loc);
    // Iterate through stops to create markers & infowindows
    for (var key in stopsInArea) {
      const contentString = "<div>" + stopsInArea[key].name + "</div>";
      // eslint-disable-next-line no-undef
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
      });
      // eslint-disable-next-line no-undef
      const marker = new google.maps.Marker({
        position: stopsInArea[key].position,
        mapLoaded,
        // icon: red_icon,
      });

      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          mapLoaded,
          shouldFocus: false,
        });
      });

      marker.setMap(mapLoaded);
    }

    // return (
    //   <Marker position={center}/>
    // )
  };

  return (
    <div id="GoogleMap" role="map-container">
      {modalType === "CLOSED" && (
        <div>
          <WeatherIcon />

          <div className="geolocator">
            <button
              onClick={() => {
                geolocatorToggler();
              }}
            >
              <img src="/geo2.png" id="geolocatorIcon" alt="compass" />
            </button>
          </div>

          <div className="showStops">
            <div className="stopsLabel">Stops</div>
            <Switch
              checked={clusterer}
              onChange={clusterToggler}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            />
          </div>
        </div>
      )}

      <GoogleMap
        role="map"
        center={center}
        zoom={14}
        mapContainerStyle={mapContainerStyle}
        options={options}
        onLoad={(mapLoaded) => setMapLoaded(mapLoaded)}
        onClick={() => {
          setModalType("CLOSED");
        }}
      >
        {clusterer && (
          <MarkerClusterer>
            {(clusterer) =>
              stops2.map(({ id, name, position }) => (
                <Marker
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                  clusterer={clusterer}
                >
                  {activeMarker === id ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div>{name}</div>
                    </InfoWindow>
                  ) : null}
                </Marker>
              ))
            }
          </MarkerClusterer>
        )}

        {geolocatorToggle &&
          navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            panTo(lat, lng);
          })}

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

export default Map;
