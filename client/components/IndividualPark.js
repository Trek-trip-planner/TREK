import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

function IndividualPark({ park }) {
  return (
    <Card className={'root'} align='center'>
      <CardActionArea>
        <CardMedia id='park' image={park.image[0]} />
        <CardHeader title={park.name} />
        <CardContent className='museum-info-wrapper'>
          <Typography variant='body2' color='textSecondary' component='p'>
            Park Name
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {park.state}
          </Typography>
          <Button
            variant='contained'
            color='primary'
            className='purchase-button'
            endIcon={<KeyboardArrowRightIcon />}
          >
            View Park Details
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default IndividualPark;
