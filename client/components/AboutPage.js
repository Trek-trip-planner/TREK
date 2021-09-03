import React from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    padding: 30,
    display: 'flex',
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardDivs: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  aboutImg: {
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '325px',
  },
}));

function AboutPage(props) {
  const classes = useStyles();
  return (
    <Container className='account-wrapper'>
      <Typography
        className={classes.header}
        variant='h4'
        component='h3'
        color='primary'
        align='center'
        fontWeight='fontWeightBold'
        m={2}
      >
        About Trek
      </Typography>
      <div className={classes.cardDivs}>
        <Grid item style={{ flexBasis: '50%' }}>
          <Paper className={classes.paper} elevation={0}>
            <img src='/Trek-logo-01.png' className={classes.aboutImg} />
          </Paper>
        </Grid>
        <Grid item style={{ flexBasis: '50%' }}>
          <Paper className={classes.paper} elevation={0}>
            <p style={{ color: 'black', fontSize: '18', minWidth: '350px' }}>
              Trek is an app that helps you plan your next trip to visit the
              National Parks. Here at Trek, we hope to be your one stop shop for
              all this related to National Parks. You can explore the list of
              over 400 National Parks to find the perfect place for your next
              adventure. You can view specific landmarks nearby a specific park
              to make sure that you can get the fullest out of your vacation.
              You can also create a trip and add parks to it, showing you your
              specific trip details, including the route, how long it will take,
              your starting location and all stops along the route, and more!
              Have fun and get exploring!
            </p>
          </Paper>
        </Grid>
      </div>
      <Typography
        className={classes.header}
        variant='h4'
        component='h3'
        color='primary'
      >
        The Trek Development Team:
      </Typography>
      <div>
        <Grid>
          {/* <img /> */}
          <h6>Alex Fox</h6>
          <br />
          <p>LinkedIn</p>
        </Grid>
        <Grid>
          {/* <img /> */}
          <h6>Allison Collier</h6>
          <br />
          <p>LinkedIn</p>
        </Grid>
        <Grid>
          {/* <img /> */}
          <h6>Sam Radecki</h6>
          <br />
          <p>LinkedIn</p>
        </Grid>
        <Grid>
          {/* <img /> */}
          <h6>Sunitha Nela</h6>
          <br />
          <p>LinkedIn</p>
        </Grid>
      </div>
    </Container>
  );
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    trips: state.trips,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTrips: (userId) => dispatch(fetchTrips(userId)),
  };
};

export default connect(mapState, mapDispatch)(AboutPage);
