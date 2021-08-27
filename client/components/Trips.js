import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrips, deleteTripThunk } from '../store/trips';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
  Typography
} from '@material-ui/core';
import PopUpWindow from "./PopUpWindow"

export class Trips extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTrips(this.props.userId);
  }

  render() {
    const trips = this.props.trips;
    // if(!trips) {
    //   alert('No trips to delete')
    // }

    return (
      <Paper>
        <div className='my-trip-header'>
          <Typography
            variant='h4'
            component='h3'
            color='secondary'
            align='center'
            fontWeight='fontWeightBold'
          >
            My Trips
          </Typography>
        </div>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Edit Trip</TableCell>
              <TableCell>Remove Trip</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell>
                  <Link href={`mytrips/${trip.id}`}> {trip.name} </Link>
                </TableCell>
                <TableCell>{trip.startDate}</TableCell>
                <TableCell>{trip.endDate}</TableCell>
                <TableCell>
                  <PopUpWindow trip ={trip}/>
                </TableCell>
                <TableCell>
                  <Button
                    color='secondary'
                    onClick={() => this.props.deleteTripThunk(trip.id)}
                  >
                    {' '}
                    <DeleteIcon color='primary' />
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
    userId: state.auth.id,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrips: (userId) => dispatch(fetchTrips(userId)),
    deleteTripThunk: (id) => dispatch(deleteTripThunk(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Trips);
