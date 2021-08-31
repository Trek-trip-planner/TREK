import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: 30,
  },
  details: {
    padding: 25,
  },
  route: {
    padding: 25,
  },
}));

export default function Directions(props) {
  const { googleAPIKey, trip } = props;

  const numLat = Number(trip.parks[0].latitude);
  const numLong = Number(trip.parks[0].longitude);

  const lng = Number(numLong.toFixed(4));
  const lat = Number(numLat.toFixed(4));

  const center = {
    lat: lat,
    lng: lng,
  };

  const fullAddress = `${props.trip.trip_StartingPt.address} ${props.trip.trip_StartingPt.city}, ${props.trip.trip_StartingPt.state}`;

  const [response, setResponse] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleAPIKey,
  });

  const classes = useStyles();

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.error('response: ', response);
      }
    }
  };

  console.log('response', response);
  return isLoaded ? (
    <div className='map'>
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
          {response === null && (
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
      <div className='trip-detials-container'>
        <Typography
          className={classes.details}
          variant='h6'
          component='h3'
          color='primary'
          align='left'
          fontWeight='fontWeightBold'
          m={2}
        >
          Trip Details:
          <p>
            {trip.trip_StartingPt.address}, {trip.trip_StartingPt.city},
            {trip.trip_StartingPt.state}, {trip.trip_StartingPt.zip} to
            {trip.parks[0].fullName}
          </p>
          <br />
          <p>
            {' '}
            Dates:
            {trip.startDate} - {trip.endDate}
          </p>
          <br />
        </Typography>
        {response !== null && (
          <Typography
            className={classes.route}
            variant='h6'
            component='h3'
            color='primary'
            align='left'
            fontWeight='fontWeightBold'
            m={2}
          >
            Trip Information:
            <p>
              Duration:
              {response.routes[0].legs[0].duration.text}
            </p>
            <br />
            <p>
              Distance:
              {response.routes[0].legs[0].distance.text}
            </p>
          </Typography>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}
