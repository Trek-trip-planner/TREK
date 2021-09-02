import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import HomeCarousel from './ImgCarousel';
import IndividualPark from './IndividualPark';
import history from '../history';
import { fetchParksThunk } from '../store/parks';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: '/ZionNationalPark.jpg',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  contain: {
    disableGutters: 'false',
    padding: 0,
    maxWidth: 'unset',
  },
  title: {
    align: 'center',
    fontWeight: 'fontWeightBold',
    padding: 30,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function Home(props) {
  useEffect(() => {
    (async () => {
      await props.getParks();
    })();
  }, []);

  const classes = useStyles();

  if (!props.parks) {
    return 'Loading';
  }

  const sliceStart = Math.floor(Math.random() * props.parks.length);
  const sliceEnd = sliceStart + 6;

  return (
    <div>
      <Container className={classes.contain}>
        <HomeCarousel />
      </Container>
      <Container align='center'>
        <Typography
          className={classes.title}
          variant='h4'
          component='h3'
          color='primary'
        >
          Plan Your Next Adventure Today!
        </Typography>
      </Container>
      <Grid container spacing={3}>
        {props.parks.slice(sliceStart, sliceEnd).map((park) => (
          <Grid item key={park.id} xs={12} md={6} lg={4}>
            <IndividualPark park={park} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.button}>
        <Button
          onClick={() => history.push('/all-parks')}
          variant='contained'
          color='primary'
          style={{
            margin: '25px',
            padding: '10px',
            fontSize: 15,
          }}
        >
          View All Parks
        </Button>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    parks: state.parks,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getParks: () => dispatch(fetchParksThunk()),
  };
};

export default connect(mapState, mapDispatch)(Home);
