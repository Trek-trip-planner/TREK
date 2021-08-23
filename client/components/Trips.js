import React, { Component } from 'react';
import trips from '../../script/Trips';
import Trip from './AddTrip';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default class Trips extends Component {
  state = {
    trips: trips,
  };
  deleteTour = tripName => {
    const {trips}= this.state
    const updatedTrips = trips.filter(trip => trip.name !== tripName );
    this.setState({
      trips:updatedTrips
    })
  }

  render() {
    const { trips } = this.state
    console.log('props', this.props.match.params.id);

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
            My trips
          </Box>
        </Typography>
        <Grid container spacing={3}>
          {trips.length !== 0 ? (
            trips.map((trip) => (
              <Grid item key={trip.name} xs={12} md={6} lg={4}>
                <Trip trip={trip} deleteTour = {this.deleteTour} />
              </Grid>
            ))
          ) : (
            <h3>Loading</h3>
          )}
        </Grid>
      </Container>
    );
  }
}
