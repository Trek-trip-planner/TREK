import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fetchTrips, addTrip } from '../store/trips';
import {
  Paper,
  Link,
  Typography,
  Divider,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

function CreateTrip(props) {
  const { park, userId, trips } = props;
  const classes = useStyles();
  const [addedTrip, setAddedTrip] = useState();

  console.log('my trips: ', trips);

  useEffect(() => {
    (async () => {
      await props.fetchTrips();
    })();
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
  const handleChange = (event, value) => {
    console.log('triped Slected:', value);
    console.log('park Slected:', park);
    console.log('value id:', value.id);
    console.log('park id', park.id);
    addTrip(value, park);
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h4' align='center'>
          Add to a trip!
        </Typography>

        <form>
          <Typography component='h4' variant='h6'>
            Your trips:
          </Typography>
          <FormControl
            align='center'
            variant='outlined'
            className={classes.formControl}
          >
            <Autocomplete
              className={classes.inputInput}
              onChange={(event, addedTrip, park) =>
                handleChange(event, addedTrip, park)
              }
              value={addedTrip}
              options={props.trips}
              getOptionLabel={(trip) => trip.name}
              style={{ width: 300 }}
              renderInput={(trips) => (
                <TextField
                  {...trips}
                  label='Search your trips'
                  variant='outlined'
                />
              )}
            />
          </FormControl>
          <DialogActions>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Add
            </Button>
          </DialogActions>
        </form>
        <Divider variant='fullWidth' className={classes.divider} />
        <Typography component='h4' variant='h4' align='center'>
          OR
        </Typography>
        <Divider variant='fullWidth' className={classes.divider} />
        <Typography component='h2' variant='h4' align='center'>
          Create your trip!
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
    trips: state.trips,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createTrip: (tripInfo) => dispatch(createNewTrip(tripInfo)),
    clearTrip: () => dispatch(clearTrip()),
    fetchTrips: (userId) => dispatch(fetchTrips(userId)),
    addTrip: (trip, park) => dispatch(addTrip(trip, park)),
  };
};

export default connect(mapState, mapDispatch)(CreateTrip);
