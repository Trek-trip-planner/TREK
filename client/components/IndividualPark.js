import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 300,
    paddingTop: '0%',
  },
}));

function IndividualPark({ park }) {
  const classes = useStyles();
  const parkImg = park.images.length ? park.images[0].url : '/Trek-logo-01.png';
  let parkName = park.fullName.split(' ').join('-');
  const preventDefault = (event) => {
    event.preventDefault();
    history.push(`/${parkName}`);
  };

  return (
    <Card className={'root'} align='center'>
      <CardActionArea>
        <Link onClick={preventDefault}>
          <CardMedia
            component='img'
            className={classes.media}
            // square
            id='park'
            src={parkImg}
          />
        </Link>


        <CardContent className='museum-info-wrapper'>
          <Typography variant='body2' color='textSecondary' component='p'>
            {park.fullName}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {park.states}
          </Typography>
          <Button
            variant='contained'
            color='primary'
            className='purchase-button'
            endIcon={<KeyboardArrowRightIcon />}
            onClick={() => history.push(`/${parkName}`)}
          >
            View Park Details
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default IndividualPark;
