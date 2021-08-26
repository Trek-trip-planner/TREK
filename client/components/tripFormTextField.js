import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function TripFormTextField(props) {
  const [tripName, setTripName] = useState('');
  const [startingPoint, setStartingPoint] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { trip } = props;

  useEffect(() => {
    if (props.trip) {
      setTripName(trip.name);
      setStartingPoint(trip.trip_StartingPt.address);
      setCity(trip.trip_StartingPt.city);
      setZip(trip.trip_StartingPt.zip);
      setCountry(trip.trip_StartingPt.country);
      setStartDate(trip.startDate);
      setEndDate(trip.endDate);
      setState(trip.trip_StartingPt.state);
    }
  }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <form onSubmit={(evt) => props.handleSubmit(evt, props.userId)}>
        <Typography variant='h6' gutterBottom>
          Trip Name:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id='tripName'
              name='tripName'
              label='Trip Name'
              fullWidth
              value={tripName}
              onChange={(ev) => setTripName(ev.target.value)}
            />
          </Grid>
        </Grid>
        <Typography variant='h6' gutterBottom style={{ paddingTop: 15 }}>
          Starting location:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id='address1'
              name='address1'
              label='Address line 1'
              fullWidth
              autoComplete='shipping address-line1'
              value={startingPoint}
              onChange={(ev) => setStartingPoint(ev.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='city'
              name='city'
              label='City'
              fullWidth
              autoComplete='shipping address-level2'
              value={city}
              onChange={(ev) => setCity(ev.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              value={state}
              id='state'
              name='state'
              label='State/Province/Region'
              fullWidth
              onChange={(ev) => setState(ev.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              value={zip}
              id='zip'
              name='zip'
              label='Zip / Postal code'
              fullWidth
              autoComplete='shipping postal-code'
              onChange={(ev) => setZip(ev.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='country'
              name='country'
              label='Country'
              fullWidth
              value={country}
              autoComplete='shipping country'
              onChange={(ev) => setCountry(ev.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Typography variant='h6' gutterBottom style={{ paddingTop: 15 }}>
            {`Date(s):`}
          </Typography>
          <Grid item xs={12} sm={6}>
            <div noValidate>
              <TextField
                required
                id='startDate'
                label='Start Date'
                type='date'
                value={startDate}
                onChange={(ev) => setStartDate(ev.target.value)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                required
                id='endDate'
                label='End Date'
                value={endDate}
                type='date'
                className={classes.textField}
                onChange={(ev) => setEndDate(ev.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          {props.trip ? 'Edit' : 'Create'}
        </Button>
      </form>
    </React.Fragment>
  );
}
