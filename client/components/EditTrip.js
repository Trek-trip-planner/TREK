import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Link,
  Typography,
  FormControl,
  DialogActions,
  Button,
  Divider,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { editTrip, removeParkFromTrip } from '../store/trips';
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
  divider: {
    background: 'black',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputInput: {
    borderRadius: theme.shape.borderRadius,
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '20ch',
    },
  },
}));

function EditTrip(props) {
  const { trip, userId } = props;
  const classes = useStyles();

  //state to determine if diables
  const [toDisable, setToDisable] = useState(true);
  const [parkSelected, setParkSelected] = useState(null);

  useEffect(() => {
    //if length is greater than one enable the autocomplete - set to false
    if (trip.parks.length > 1) {
      setToDisable(false);
    }

    return () => {
      if (props.storeTrip.error) {
        props.clearTrip();
      }
    };
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
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
  };

  const handleChange = (event, value) => {
    setParkSelected(value);
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h4' align='center'>
          {`Edit your trip`}
        </Typography>
        <form>
          <Typography component='h4' variant='h6'>
            Remove a parks from your trip:
          </Typography>
          <FormControl
            align='center'
            variant='outlined'
            className={classes.formControl}
          >
            <Autocomplete
              className={classes.inputInput}
              onChange={(event, value) => handleChange(event, value)}
              disabled={toDisable}
              options={trip.parks}
              getOptionLabel={(park) => park.fullName}
              style={{ width: 300 }}
              renderInput={(parks) => (
                <TextField
                  {...parks}
                  label='Delete a Park'
                  variant='outlined'
                />
              )}
            />
          </FormControl>
          <DialogActions>
            <Button
              type='submit'
              onClick={(event) => {
                event.preventDefault();
                console.log('button clicked!');
                console.log('Park selected: ', parkSelected);
                props.removeParkFromTrip(trip.id, parkSelected.id);
                props.handleClose();
                //props.addTrip(addedTripValue, park);
              }}
              fullWidth
              variant='contained'
              color='primary'
              disabled={toDisable}
              className={classes.submit}
            >
              Delete
            </Button>
          </DialogActions>
        </form>
        <Divider variant='fullWidth' className={classes.divider} />
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
    removeParkFromTrip: (tripId, parkId) =>
      dispatch(removeParkFromTrip(tripId, parkId)),
  };
};

export default connect(mapState, mapDispatch)(EditTrip);
