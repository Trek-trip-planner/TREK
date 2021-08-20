import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import HomeCarousel from './ImgCarousel';
import IndividualPark from './IndividualPark';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: '/ZionNationalPark.jpg',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  contain: {
    disableGutters: 'false',
    padding: 0,
    maxWidth: 'unset'
  }
}));

function Home () {
  const classes = useStyles();
  // const [parks] = useState()

  return (
    <div >
      <CssBaseline />
        <Container className={classes.contain} >
          <HomeCarousel />
        </Container>
        <Container align='center'>
          <Button >
            Explore All Parks
          </Button>
        </Container>
        {/* <Grid container spacing={3}>
          {parks.map((park) => (
            <Grid item key={park.id} xs={12} md={6} lg={4} >
              <IndividualPark park={park}/>
            </Grid>
          ))}
        </Grid> */}
    </div>
  )
}

export default Home;
