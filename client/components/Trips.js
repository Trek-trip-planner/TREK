import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrips, deleteTripThunk}  from '../store/trips';


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
    this.props.fetchTrips(this.props.userId);
  }
  render() {
    const trips = this.props.trips;
    // if(!trips) {
    //   alert('No trips to delete')
    // }

    console.log('trips', trips)
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
                    onClick={() => this.props.deleteTripThunk(trip.id)}
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
    userId:state.auth.id,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrips: (userId) => dispatch(fetchTrips(userId)),
    deleteTripThunk:(id) => dispatch(deleteTripThunk(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Trips);
