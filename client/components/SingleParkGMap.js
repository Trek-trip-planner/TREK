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
  console.log('Rendering');
  const { googleAPIKey, park } = props;

  const numLat = Number(park.latitude);
  const numLong = Number(park.longitude);

  const [lng, setLng] = useState(Number(numLong.toFixed(4)));
  const [lat, setLat] = useState(Number(numLat.toFixed(4)));

  const center = {
    lat: lat,
    lng: lng,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleAPIKey,
  });

  const [map, setMap] = React.useState(null);
  const [showInfoWindows, setShowInfoWindows] = React.useState({});
  const [nearbyPlaces, setNearbyPlaces] = React.useState(null);
  const [reload, setReload] = React.useState(false);

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

  // function resultsCallback(results, status) {
  //   console.log(JSON.stringify(results), JSON.stringify(status));
  //   const places = [];
  //   if (status == google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       places.push({
  //         center: results[i].geometry.location,
  //         name: results[i].name,
  //       });
  //     }
  //   }
  //   setNearbyPlaces(places);
  // }

  // if (map && nearbyPlaces === null) {
  //   const service = new google.maps.places.PlacesService(map);
  //   service.nearbySearch(
  //     {
  //       location: { lat: lat, lng: lng },
  //       radius: '20000',
  //       type: ['park'],
  //     },
  //     resultsCallback
  //   );
  // }

  const createMarker = (center, name, mainPark) => {
    let showInfoWindow = name in showInfoWindows && showInfoWindows[name];
    const isIcon = mainPark ? '/Trek-Marker-03.png' : '';
    return (
      <Marker
        key={name}
        position={center}
        icon={isIcon}
        onClick={() => {
          if (!(name in showInfoWindows)) {
            showInfoWindows[name] = true;
          } else {
            showInfoWindows[name] = !showInfoWindows[name];
          }
          setShowInfoWindows(showInfoWindows);
          setReload(!reload);
        }}
      >
        {showInfoWindow && (
          <InfoWindow position={center}>
            <div style={divStyle}>
              <p>{name}</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  };

  const markers = [];
  const mainPark = markers.push(createMarker(center, park.fullName, true));
  if (nearbyPlaces) {
    for (let i = 0; i < nearbyPlaces.length; i++) {
      markers.push(createMarker(nearbyPlaces[i].center, nearbyPlaces[i].name));
    }
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers}
    </GoogleMap>
  ) : (
    <></>
  );
}
