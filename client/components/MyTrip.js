import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MyTripMap from './MyTripMap';

const useStyles = makeStyles((theme) => ({}));

function MyTrip(props) {
  const { trip, getTrip } = props;
  const tripName = props.match.params.tripName;
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      await props.getTrip(tripName);
    })();
  }, []);

  if (!trip.id) {
    return <Typography align='center'>Loading...</Typography>;
  }

  return (
    <Container className='account-wrapper'>
      <Typography
        variant='h4'
        component='h3'
        color='secondary'
        align='center'
        fontWeight='fontWeightBold'
        m={2}
      >
        {' '}
        {trip.name}
      </Typography>
      <MyTripMap trip={trip} />
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
    getTrip: () => dispatch(getTrip()),
    getParkInfo: (parkName) => dispatch(fetchParkThunk(parkName)),
  };
};

export default connect(mapState, mapDispatch)(MyTrip);
