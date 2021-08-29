import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Directions from './SingleTripGMap';
import { fetchTrip } from '../store/trip';
import { LoadScript } from '@react-google-maps/api';

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

function MyTrip(props) {
  const { trip, getTrip } = props;
  const tripId = props.match.params.tripId;
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      await props.getTrip(tripId);
    })();
  }, []);

  if (!trip.id) {
    return <Typography align='center'>Loading...</Typography>;
  }
  console.log(JSON.stringify(trip));
  return (
    <Container className='trip-wrapper'>
      <Typography
        className={classes.header}
        variant='h4'
        component='h3'
        color='secondary'
        align='center'
        fontWeight='fontWeightBold'
        m={2}
      >
        {trip.name}
      </Typography>
      {/* <LoadScript> */}
      <Directions trip={trip} />
      {/* </LoadScript> */}
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
            {' '}
            {trip.trip_StartingPt.address}, {trip.trip_StartingPt.city},{' '}
            {trip.trip_StartingPt.state}, {trip.trip_StartingPt.zip} to insert
            ending point{' '}
          </p>
          <br />
          <p>
            {' '}
            Dates:
            {/* {trip.startDate} - {trip.endDate} */}{' '}
          </p>
          <br />
        </Typography>
        <Typography
          className={classes.route}
          variant='h6'
          component='h3'
          color='primary'
          align='left'
          fontWeight='fontWeightBold'
          m={2}
        >
          Trip Route:
        </Typography>
      </div>
    </Container>
  );
}

const mapState = (state) => {
  return {
    trip: state.trip,
    park: state.park,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getTrip: (tripId) => dispatch(fetchTrip(tripId)),
    getParkInfo: (parkName) => dispatch(fetchParkThunk(parkName)),
  };
};

export default connect(mapState, mapDispatch)(MyTrip);
