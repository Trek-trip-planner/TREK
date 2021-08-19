import React from 'react'
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { HomeCarousel } from './ImgCarousel';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: '/ZionNationalPark.jpg',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  contain: {
    disableGutters: 'false'
  }
}));

function Home () {
  const classes = useStyles();
  //const parks = this.props.parks

  return (
    <div >
      <CssBaseline />
        <Container className={classes.contain} >
          <HomeCarousel />
        </Container>
        <Container align='center'>
          link to park cards
        </Container>
        {/* <Grid container spacing={3}>
          {parks.map((park) => (
            <Grid item key={review.id} xs={12} md={6} lg={4} >
              < individual park card component park={park}/>
            </Grid>
          ))}
        </Grid> */}
    </div>
  )
}

export default Home
