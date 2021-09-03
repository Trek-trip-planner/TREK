import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrips, deleteTripThunk } from '../store/trips';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import PopUpWindow from './PopUpWindow';

export class Trips extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTrips(this.props.userId);
  }

  render() {
    const trips = this.props.trips;

    return (
      <Paper className='all-trips-table'>
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
        <Table size='small' className='my-trips-table'>
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
                  <Link id='myTripsLink' to={`mytrips/${trip.id}`}>
                    {' '}
                    {trip.name}{' '}
                  </Link>
                </TableCell>
                <TableCell>{trip.startDate}</TableCell>
                <TableCell>{trip.endDate}</TableCell>
                <TableCell>
                  <PopUpWindow trip={trip} />
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
