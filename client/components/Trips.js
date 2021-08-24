import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrips } from '../store/trips';

import {
  Button,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

export class Trips extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.fetchTrips();
  }

  deleteTrip(tripName) {
    const {trips } = this.state;
    console.log('trips', trips);
    const updatedTrips = trips.filter((trip) => trip.name !== tripName);
    this.setState({
      trips: updatedTrips,
    });
  }

  render() {
    const trips = this.props.trips;
    let user = this.props.trips.id;
    console.log('trips', trips)
    console.log('user', user)


    return (
      <Paper>
        <Table size='small'>
          <TableHead >
            <TableRow>

              <TableCell> # </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Starting Pt</TableCell>
              <TableCell>Remove Trip</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell scope = "row">#</TableCell>
                <TableCell>{trip.name}</TableCell>
                <TableCell>
                  <TextField
                    id='date'
                    label='Trip Date'
                    type='date'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>{}</TableCell>
                <TableCell>
                  <Button
                    color='secondary'
                    onClick={() => this.deleteTrip(`${trip.id}`)}
                  >
                    {' '}
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
    isLoggedIn: !!state.auth.id,
  };
};
//mapping state to props
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrips: () => dispatch(fetchTrips()),
  };
};
//mapping props and dispatching to thunk creator
export default connect(mapStateToProps, mapDispatchToProps)(Trips);
