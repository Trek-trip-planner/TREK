import React, { useState } from 'react';
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
}));

function CreateTrip(props) {
  const { park } = props;
  const classes = useStyles();

  const [value, setValue] = useState([null, null]);

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h4' align='center'>
          {`Create your trip to ${park.fullName}!`}
        </Typography>
        <React.Fragment>
          <Typography variant='h6' gutterBottom>
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
            <Grid item xs={12}>
              <TextField
                id='address2'
                name='address2'
                label='Address line 2'
                fullWidth
                autoComplete='shipping address-line2'
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
            <Typography variant='h6' gutterBottom>
              {`Date(s):`}
            </Typography>
            <form className={classes.container} noValidate>
              <TextField
                id='date'
                label='Birthday'
                type='date'
                defaultValue='2017-05-24'
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
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
    </main>
  );
}

export default CreateTrip;
