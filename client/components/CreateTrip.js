import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TextField,
  Grid,
  Link,
  Typography,
  Button,
  Box,
} from '@material-ui/core';

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function CreateTrip(props) {
  const { park, userId } = props;
  const classes = useStyles();

  handleSubmit = (evt) => {
    evt.preventDefault();
    const userId = userId;
    const parkId = park.id;
    const tripName = evt.target.tripName;
    const startingPoint = evt.target.address1;
    const city = evt.target.city;
    const state = evt.target.state;
    const zip = evt.target.zip;
    const country = evt.target.country;
    const startDate = evt.target.startDate;
    const endDate = evt.target.endDate;
  };

  return (
    <form className={classes.layout} onSubmit={handleSubmit}>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h4' align='center'>
          {`Create your trip to ${park.fullName}!`}
        </Typography>
        <React.Fragment>
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='state'
                name='state'
                label='State/Province/Region'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='zip'
                name='zip'
                label='Zip / Postal code'
                fullWidth
                autoComplete='shipping postal-code'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='country'
                name='country'
                label='Country'
                fullWidth
                autoComplete='shipping country'
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
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  required
                  id='endDate'
                  label='End Date'
                  type='date'
                  className={classes.textField}
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
            Create
          </Button>
        </React.Fragment>
      </Paper>
      <Copyright />
    </form>
  );
}
const mapState = (state) => {
  return {
    userId: state.auth.id,
  };
};
export default connect(mapState)(CreateTrip);
