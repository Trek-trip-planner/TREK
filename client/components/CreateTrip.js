import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Link, Typography } from '@material-ui/core';
import { createNewTrip, clearTrip } from '../store/trip';
import TripFormTextField from './TripFormTextField';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Trek
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

function CreateTrip(props) {
  const { park, userId } = props;
  const classes = useStyles();

  useEffect(() => {
    return () => {
      if (props.trip.error) {
        props.clearTrip();
      }
    };
  }, []);

  const handleSubmit = (evt, userId) => {
    evt.preventDefault();
    const parkId = park.id;
    const tripName = evt.target.tripName?.value;
    const startingPoint = evt.target.address1?.value;
    const city = evt.target.city?.value;
    const state = evt.target.state?.value;
    const zip = evt.target.zip?.value;
    const country = evt.target.country?.value;
    const startDate = evt.target.startDate?.value;
    const endDate = evt.target.endDate?.value;

    props.createTrip({
      userId,
      parkId,
      tripName,
      startingPoint,
      city,
      state,
      zip,
      country,
      startDate,
      endDate,
    });
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h4' align='center'>
          {`Create your trip to ${park.fullName}!`}
        </Typography>
        <Typography component='h3' color='error' style={{ padding: 5 }}>
          {props.trip.error ? props.trip.error.response.data : ''}
        </Typography>
        <TripFormTextField handleSubmit={handleSubmit} userId={userId} />
      </Paper>
      <Copyright />
    </main>
  );
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    trip: state.trip,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createTrip: (tripInfo) => dispatch(createNewTrip(tripInfo)),
    clearTrip: () => dispatch(clearTrip()),
  };
};

export default connect(mapState, mapDispatch)(CreateTrip);
