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
import { deleteTripThunk } from '../store/trips';

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

  console.log('PARK LOCATIONS ARRAY: ', parks);

  // const center = {
  //   lat: lat,
  //   lng: lng,
  // };

  const fullAddress = `${props.trip.trip_StartingPt.address} ${props.trip.trip_StartingPt.city}, ${props.trip.trip_StartingPt.state}`;

  const [response, setResponse] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState({});
  const [reload, setReload] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleAPIKey,
  });

  const classes = useStyles();

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        console.log('going into the OK statement');
        setResponse(response);
      } else if (response.status === 'ZERO_RESULTS') {
        console.log('Entering the second if statement', response);
        console.log(trip.id);
        //INSTEAD OF DELETING THE TRIP - need to create a thunk/route that will just remove a park from the trip OR delete the trip if this is the only park on it
        //definitely need to know which park was the one just added so need to pull the park ID from somewhere or pass it from the add to current trip button
        props.deleteTripThunk(trip.id);
        return history.push('/errorpage');
      }
    }
  };

  const handleClick = (name) => {};

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
                onClick={() => {
                  if (!showInfoWindow['start']) {
                    showInfoWindow['start'] = true;
                  } else {
                    showInfoWindow['start'] = !showInfoWindow['start'];
                  }
                  setShowInfoWindow(showInfoWindow);
                  setReload(!reload);
                }}
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
                console.log('Lat: ', lat);
                console.log('Long: ', lng);
                return (
                  <Marker
                    position={{ lat: Number(lat), lng: Number(lng) }}
                    icon={'/Trek-Marker-03.png'}
                    //label={park.name}
                    key={index}
                    onClick={() => {
                      if (!showInfoWindow[park.name]) {
                        showInfoWindow[park.name] = true;
                      } else {
                        showInfoWindow[park.name] = !showInfoWindow[park.name];
                      }
                      setShowInfoWindow(showInfoWindow);
                      setReload(!reload);
                    }}
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
            {trip.trip_StartingPt.address}, {trip.trip_StartingPt.city},
            {trip.trip_StartingPt.state}, {trip.trip_StartingPt.zip} to{' '}
            {trip.parks.map((park) => park.fullName).join(', ')}
            {/* {trip.parks[0].fullName} */}
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
const mapDispatchToProps = (dispatch) => {
  return {
    deleteTripThunk: (id) => dispatch(deleteTripThunk(id)),
  };
};
export default connect(null, mapDispatchToProps)(Directions);
