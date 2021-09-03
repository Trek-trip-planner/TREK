import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IndividualPark from './IndividualPark';
import { fetchParksThunk } from '../store/parks';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
      justifyContent: 'center',
      display: 'flex',
    },
  },
  header: {
    padding: 30,
    display: 'flex',
    textAlign: 'center',
  },
}));

function AllParks(props) {
  useEffect(() => {
    (async () => {
      await props.getParks();
    })();
  }, []);

  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };
  const numOfPages = Math.ceil(props.parks.length / 15);
  const pageStart = 15 * (page - 1);
  const pageEnd = 15 * page;

  return (
    <Container className='account-wrapper'>
      <Typography
        className={classes.header}
        variant='h4'
        component='h3'
        color='secondary'
      >
        Discover the National Parks:
      </Typography>
      <Grid container spacing={3}>
        {props.parks.length !== 0 ? (
          props.parks.slice(pageStart, pageEnd).map((park) => (
            <Grid item key={park.id} xs={12} md={6} lg={4}>
              <IndividualPark park={park} />
            </Grid>
          ))
        ) : (
          <h3>Loading</h3>
        )}
      </Grid>
      <div className={classes.root}>
        <Typography></Typography>
        <Pagination count={numOfPages} page={page} onChange={handleChange} />
      </div>
    </Container>
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

export default connect(mapState, mapDispatch)(AllParks);
