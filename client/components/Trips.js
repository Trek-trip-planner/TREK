import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTrips } from '../store/trips';
import Trip from './AddTrip';
import Grid from '@material-ui/core/Grid';
import { Button, Container, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Paper from "material-ui/Paper";
import Checkbox from '@material-ui/core/Checkbox';
import { IconButton } from '@material-ui/core/';
import { Delete } from '@material-ui/icons';

 export class Trips extends Component {


  componentDidMount(){
    this.props.fetchTrips()
  }

  deleteTrip(tripName) {
    const {trips}= this.state
    const updatedTrips = trips.filter(trip => trip.name !== tripName );
    this.setState({
      trips:updatedTrips
    })
  }

  render() {
    const  trips  = this.props.trips
    // const slNo = 1;
    // slNo++

    return (
      <Paper>
        <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell> # </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Starting Pt</TableCell>
            <TableCell >Remove Trip</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell>#</TableCell>
              <TableCell>{trip.name}</TableCell>
              <TableCell>date</TableCell>
              <TableCell>{}</TableCell>
              <TableCell>
                <Button color ="secondary"
                 onClick={() => this.deleteTrip(`${trip.name}`)}
                >  Delete</Button>

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
    isLoggedIn: !!state.auth.id
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
