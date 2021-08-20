import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IndividualPark from './IndividualPark';
import { fetchParksThunk } from '../store/parks';

function AllParks(props) {
  useEffect(() => {
    (async () => {
      const parks = await props.getParks();
    })();
  }, []);

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
        <Box fontWeight='fontWeightBold' m={1}>
          Discover the National Parks:
        </Box>
      </Typography>
      <Grid container spacing={3}>
        {props.parks.length !== 0 ? (
          props.parks.map((park) => (
            <Grid item key={park.id} xs={12} md={6} lg={4}>
              <IndividualPark park={park} />
            </Grid>
          ))
        ) : (
          <h3>Loading</h3>
        )}
      </Grid>
    </Container>
  );
}

const mapState = (state) => {
  return {
    parks: state.parks,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getParks: () => dispatch(fetchParksThunk()),
  };
};

export default connect(mapState, mapDispatch)(AllParks);
