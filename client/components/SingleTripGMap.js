import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';

export default function Directions(props) {
  const numLat = Number(props.trip.parks[0].latitude);
  const numLong = Number(props.trip.parks[0].longitude);

  const lng = Number(numLong.toFixed(4));
  const lat = Number(numLat.toFixed(4));

  const center = {
    lat: lat,
    lng: lng,
  };

  const fullAddress = ` ${props.trip.trip_StartingPt.address} ${props.trip.trip_StartingPt.city}, ${props.trip.trip_StartingPt.state}`;

  const [response, setResponse] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB5No3DQbWF9B4_0h87oI8horwBFXKkOec',
  });

  function directionsCallback(response) {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.error('response: ', response);
      }
    }
  }

  return isLoaded ? (
    <div className='map'>
      <div className='map-settings'>
        <div className='map-container'>
          <GoogleMap
            id='directions'
            mapContainerStyle={{
              height: '500px',
              width: '100%',
            }}
            zoom={2}
            center={center}
          >
            {response == null && (
              <DirectionsService
                options={{
                  destination: center,
                  origin: fullAddress,
                  travelMode: 'DRIVING',
                }}
                callback={directionsCallback}
              />
            )}
            {response !== null && (
              <DirectionsRenderer
                options={{
                  directions: response,
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
