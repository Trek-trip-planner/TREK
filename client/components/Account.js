import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { fetchTrips } from '../store/trips';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: 30,
  },
}));

function Account(props) {
  const { userId } = props;

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      props.fetchTrips(userId);
    })();
  }, []);

  if (!props.trips) {
    return <Typography align='center'>Loading...</Typography>;
  }

  return (
    <Container className='account-wrapper'>
      <Typography
        className={classes.header}
        variant='h4'
        component='h3'
        color='secondary'
        align='center'
        fontWeight='fontWeightBold'
        m={2}
      >
        Account
      </Typography>
      <div className='account-detials-container'>
        <Typography
          variant='h3'
          component='h3'
          color='primary'
          align='center'
          fontWeight='fontWeightBold'
        >
          {userId.firstName}
        </Typography>
        <br />
        <Typography>
          link to my trips page? what info do we want on this page?
        </Typography>
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

export default connect(mapState, mapDispatch)(Account);
