import React from 'react';
import history from '../history';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 300,
    paddingTop: '0%',
    cursor: 'pointer',
  },
}));

function IndividualPark({ park }) {
  const classes = useStyles();
  const parkImg = park.images.length ? park.images[0].url : '/Trek-logo-01.png';
  let parkName = park.fullName.split(' ').join('_');
  const preventDefault = (event) => {
    event.preventDefault();
    history.push(`/${parkName}`);
  };

  return (
    <Card className={'root'} align='center'>
      <Link onClick={preventDefault}>
        <CardMedia
          component='img'
          className={classes.media}
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
    </Card>
  );
}

export default IndividualPark;
