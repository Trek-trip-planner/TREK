import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { fetchTrip } from '../store/trip';
import Directions from './SingleTripGMap';
import getKey from './googleKey';

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

  const [key, setKey] = useState(null);

  useEffect(() => {
    (async () => {
      await getTrip(tripId);
      if (key === null) {
        const myKey = await getKey();
        setKey(myKey);
      }
    })();
  }, []);

  const classes = useStyles();

  return trip && key ? (
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
      <Directions trip={trip} googleAPIKey={key} />
    </Container>
  ) : (
    <></>
  );
}

const mapState = (state) => {
  return {
    trip: state.trip,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getTrip: (tripId) => dispatch(fetchTrip(tripId)),
  };
};

export default connect(mapState, mapDispatch)(MyTrip);
