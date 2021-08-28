import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '500px',
};

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};

export default function SingleParkGMap(props) {
  const numLat = Number(props.park.latitude);
  const numLong = Number(props.park.longitude);

  const [lng, setLng] = useState(Number(numLong.toFixed(4)));
  const [lat, setLat] = useState(Number(numLat.toFixed(4)));

  const center = {
    lat: lat,
    lng: lng,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB5No3DQbWF9B4_0h87oI8horwBFXKkOec',
  });

  const [map, setMap] = React.useState(null);
  const [showInfoWindow, setShowInfoWindow] = React.useState(false);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map) {
      map.panTo(center);
    }
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={center}
        onClick={() => setShowInfoWindow(!showInfoWindow)}
      >
        {showInfoWindow && (
          <InfoWindow position={center}>
            <div style={divStyle}>
              <p>{props.park.fullName}</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  ) : (
    <></>
  );
}
