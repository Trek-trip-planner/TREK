import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Link, Typography } from '@material-ui/core';
import { editTrip } from '../store/trips';
import { clearTrip } from '../store/trip';
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

function EditTrip(props) {
  const { trip, userId } = props;
  const classes = useStyles();

  useEffect(() => {
    return () => {
      if (props.storeTrip.error) {
        props.clearTrip();
      }
    };
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    console.log('handle submit from Edit Trip is running');

    const tripId = trip.id;
    const name = evt.target.tripName?.value;
    const startingPoint = evt.target.address1?.value;
    const city = evt.target.city?.value;
    const state = evt.target.state?.value;
    const zip = evt.target.zip?.value;
    const country = evt.target.country?.value;
    const startDate = evt.target.startDate?.value;
    const endDate = evt.target.endDate?.value;

    await props.editTrip({
      tripId,
      startingPointID: trip.tripStartingPtId,
      name,
      address: startingPoint,
      city,
      state,
      zip,
      country,
      startDate,
      endDate,
    });

    // if (!props.storeTrip.error) {
    //props.handleClose();
    // }
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h4' align='center'>
          {`Edit your trip`}
        </Typography>
        <Typography component='h3' color='error' style={{ padding: 5 }}>
          {props.storeTrip.error ? props.storeTrip.error.response.data : ''}
        </Typography>
        <TripFormTextField
          handleSubmit={handleSubmit}
          userId={userId}
          trip={trip}
          handleClose={props.handleClose}
          storeTrip={props.storeTrip}
        />
      </Paper>
      <Copyright />
    </main>
  );
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    storeTrip: state.trip,
  };
};

const mapDispatch = (dispatch) => {
  return {
    editTrip: (tripInfo) => dispatch(editTrip(tripInfo)),
    clearTrip: () => dispatch(clearTrip()),
  };
};

export default connect(mapState, mapDispatch)(EditTrip);
