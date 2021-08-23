import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { IconButton } from '@material-ui/core/';
import { Delete } from '@material-ui/icons';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default class AddTrip extends Component {
  render() {
    const name = this.props.trip.name;
    // console.log('trips', name);
    const { deleteTour } = this.props;

    return (
      <Card className={'root'} align='center' variant = "outlined" style = {{backgroundColor: 'lightBlue'}}>
        <CardContent className='trip-name'>
          <Typography variant='body6' color='textPrimary' component='p'>
            {name}
          </Typography>
          <IconButton
            edge='end'
            aria-label='delete'
            onClick={() => deleteTour(name)}
          ><h6>Remove</h6>
            <Delete />
          </IconButton>
        </CardContent>
      </Card>
    );
  }
}
