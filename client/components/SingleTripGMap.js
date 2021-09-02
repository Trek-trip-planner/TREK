import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import history from '../history';
import { deleteTripThunk, removeParkFromTrip } from '../store/trips';

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};

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

function Directions(props) {
  const { googleAPIKey, trip } = props;

  const parks = trip.parks.map((park) => {
    const numLat = Number(park.latitude);
    const numLong = Number(park.longitude);

    const lng = Number(numLong.toFixed(4));
    const lat = Number(numLat.toFixed(4));

    return { location: `${lat}, ${lng}`, name: park.fullName };
  });

  const fullAddress = `${props.trip.trip_StartingPt.address} ${props.trip.trip_StartingPt.city}, ${props.trip.trip_StartingPt.state}`;

  const [response, setResponse] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState({});
  const [reload, setReload] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleAPIKey,
  });

  const classes = useStyles();

  const directionsCallback = (response) => {
    console.log('RESPONSE: ', response);
    if (response !== null) {
      if (response.status === 'OK') {
        console.log('going into the OK statement');
        console.log('RESPONSE: ', response);
        setResponse(response);
      } else if (response.status === 'ZERO_RESULTS') {
        console.log('Trip', trip);
        if (trip.parks.length > 1) {
          let greatestDate = trip.parks[0];
          trip.parks.forEach((park) => {
            if (greatestDate.createdAt < park.createdAt) {
              greatestDate = park;
            }
          });
          console.log('Greatest Dates', greatestDate);
          props.removeParkFromTrip(trip.id, greatestDate.id);
        } else {
          props.deleteTripThunk(trip.id);
        }
        return history.push('/errorpage');
      }
    }
  };

  const handleClick = (name) => {
    if (!showInfoWindow[name]) {
      showInfoWindow[name] = true;
    } else {
      showInfoWindow[name] = !showInfoWindow[name];
    }
    setShowInfoWindow(showInfoWindow);
    setReload(!reload);
  };

  if (response !== null && totalTime === 0) {
    let totalSeconds = response.routes[0].legs.reduce((accum, currVal) => {
      console.log('Current value: ', currVal);
      let time = currVal.duration.value;
      return accum + time;
    }, 0);

    console.log('TOTAL SECONDS: ', totalSeconds);
    let numdays = Math.floor(totalSeconds / 86400);
    let numhours = Math.floor((totalSeconds % 86400) / 3600);
    let numminutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
    let timeString =
      numdays + ' days ' + numhours + ' hours ' + numminutes + ' minutes ';
    setTotalTime(timeString);
  }

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
          //center={center}
        >
          {response === null && (
            <DirectionsService
              options={{
                destination: fullAddress,
                origin: fullAddress,
                waypoints: parks.map((park) => {
                  let location = park.location;
                  return { location };
                }),
                optimizeWaypoints: true,
                travelMode: 'DRIVING',
              }}
              callback={directionsCallback}
            />
          )}
          {response !== null && (
            <>
              <DirectionsRenderer
                options={{
                  directions: response,
                  suppressMarkers: true,
                }}
              />
              <Marker
                position={response.routes[0].legs[0].steps[0].start_location}
                onClick={() => handleClick('start')}
              >
                {showInfoWindow['start'] ? (
                  <InfoWindow
                    position={
                      response.routes[0].legs[0].steps[0].start_location
                    }
                  >
                    <div style={divStyle}>
                      <p>{fullAddress}</p>
                    </div>
                  </InfoWindow>
                ) : (
                  ''
                )}
              </Marker>
              {parks.map((park, index) => {
                let latLng = park.location.split(' ');
                let lat = latLng[0].slice(0, latLng[0].length - 1);
                let lng = latLng[1];
                return (
                  <Marker
                    position={{ lat: Number(lat), lng: Number(lng) }}
                    icon={'/Trek-Marker-03.png'}
                    key={index}
                    onClick={() => handleClick(park.name)}
                  >
                    {showInfoWindow[park.name] ? (
                      <InfoWindow
                        position={{ lat: Number(lat), lng: Number(lng) }}
                      >
                        <div style={divStyle}>
                          <p>{park.name}</p>
                        </div>
                      </InfoWindow>
                    ) : (
                      ''
                    )}
                  </Marker>
                );
              })}
            </>
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
          Round Trip Details:
          <p>
            Start Point: {trip.trip_StartingPt.address},{' '}
            {trip.trip_StartingPt.city},{trip.trip_StartingPt.state},{' '}
            {trip.trip_StartingPt.zip}
          </p>
          {response !== null &&
            response.routes[0].waypoint_order.map((park, index) => {
              return (
                <p key={index}>{`Stop ${index + 1}:  ${parks[park].name}`}</p>
              );
            })}
          <p>
            End Point: {trip.trip_StartingPt.address},{' '}
            {trip.trip_StartingPt.city},{trip.trip_StartingPt.state},{' '}
            {trip.trip_StartingPt.zip}
          </p>
          {/* {trip.parks.map((park) => park.fullName).join(', ')} */}
          {/* {trip.parks[0].fullName} */}
          <br />
          <p>{`Dates:  ${trip.startDate} to ${trip.endDate}`}</p>
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
              {`Distance:  ${response.routes[0].legs.reduce(
                (accum, currVal) => {
                  console.log('Current value: ', currVal);
                  let miles = currVal.distance.text.split(' ')[0];
                  return accum + Number(miles);
                },
                0
              )} miles`}
            </p>
            <br />
            <p>{`Duration:  ${totalTime}`}</p>
          </Typography>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteTripThunk: (id) => dispatch(deleteTripThunk(id)),
    removeParkFromTrip: (trip, park) =>
      dispatch(removeParkFromTrip(trip, park)),
  };
};
export default connect(null, mapDispatchToProps)(Directions);
