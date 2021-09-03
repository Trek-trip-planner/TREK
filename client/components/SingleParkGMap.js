import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: 'white',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SingleParkGMap(props) {
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
  const [dropdownValue, setDropdownValue] = React.useState(null);

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

  const handleChange = (event) => {
    let searchValue = event.target.value;
    setDropdownValue(searchValue);
  };

  function resultsCallback(results, status) {
    const places = [];
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        places.push({
          center: results[i].geometry.location,
          name: results[i].name,
        });
      }
    }
    setNearbyPlaces(places);
  }

  useEffect(() => {
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
      {
        location: { lat: lat, lng: lng },
        radius: '20000',
        type: [dropdownValue],
      },
      resultsCallback
    );
  }, [dropdownValue]);

  const classes = useStyles();
  const createMarker = (center, name, i, mainPark) => {
    let showInfoWindow = name in showInfoWindows && showInfoWindows[name];
    const isIcon = mainPark ? '/Trek-Marker-03.png' : '';
    return (
      <Marker
        key={i}
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
  const mainPark = markers.push(
    createMarker(center, park.fullName, null, true)
  );
  if (nearbyPlaces) {
    for (let i = 0; i < nearbyPlaces.length; i++) {
      markers.push(
        createMarker(nearbyPlaces[i].center, nearbyPlaces[i].name, i)
      );
    }
  }
  const options = {
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel htmlFor='outlined-age-native-simple'>
          Nearby Places
        </InputLabel>
        <Select
          native
          value={''}
          onChange={handleChange}
          label='Nearby Places'
          inputProps={{
            name: 'Nearby Places',
            id: 'outlined-nearby-places-search',
          }}
        >
          <option aria-label='Nearby Places' value='' />
          <option value={'amusement_park'}>Amusement Park</option>
          <option value={'aquarium'}>Aquarium</option>
          <option value={'art_gallery'}>Art Gallery</option>
          <option value={'campground'}>Campground</option>
          <option value={'gas_station'}>Gas Station</option>
          <option value={'hospital'}>Hospital</option>
          <option value={'laundry'}>Laundry</option>
          <option value={'lodging'}>Lodging</option>
          <option value={'museum'}>Museum</option>
          <option value={'park'}>Park</option>
          <option value={'rv_park'}>RV Park</option>
          <option value={'supermarket'}>Supermarket</option>
          <option value={'tourist_attraction'}>Tourist Attraction</option>
          <option value={'zoo'}>Zoo</option>
        </Select>
      </FormControl>
      {markers}
    </GoogleMap>
  ) : (
    <></>
  );
}
