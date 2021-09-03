import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
} from '@material-ui/core';
import { fetchParkThunk, clearPark } from '../store/park';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import PopUpWindow from './PopUpWindow';
import SingleParkGMap from './SingleParkGMap';
import getKey from './googleKey';
import Spinner from './Spinner';

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    margin: 0,
    padding: 0,
  },
  parkTitle: {
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  topDiv: {
    display: 'inline-flex',
    justifyContent: 'space-evenly',
    paddingBottom: 30,
    margin: 0,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  box: {
    flexBasis: '50%',
    width: '100%',
  },
}));

function makeAllCols(topics, numCols) {
  let allCols = [];

  for (let i = 0; i < numCols; i++) {
    allCols.push([]);
  }

  for (let i = 0; i < topics.length; i++) {
    let colIndex = i % numCols;
    allCols[colIndex].push(topics[i]);
  }

  return allCols;
}

function SingleParkPage(props) {
  const { park, getParkInfo } = props;
  const parkName = props.match.params.parkName;
  const classes = useStyles();
  const [key, setKey] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getParkInfo(parkName);
      if (key === null) {
        const myKey = await getKey();
        setKey(myKey);
      }
    })();
    return () => props.clearPark();
  }, [parkName]);

  if (!park.id || !key) {
    return <Spinner />;
  }

  const parkImg = park.images.length ? park.images[0].url : '/Trek-logo-01.png';

  const numCols = window.outerWidth > 640 ? 3 : 2;
  const allCols = makeAllCols(park.topics, numCols);

  const boxMinWidth = window.outerWidth > 640 ? '600px' : '350px';

  return (
    <div className={classes.mapContainer}>
      <Container className={classes.root} component='main'>
        <Typography
          className={classes.parkTitle}
          variant='h4'
          component='h3'
          color='primary'
        >
          {park.fullName}
        </Typography>
        <Container
          className={classes.topDiv}
          style={{ wrap: 'noWrap' }}
          display='flex'
        >
          {!loading ? <Spinner /> : ' '}
          <Box
            className={classes.box}
            style={{ overflow: 'hidden', minWidth: boxMinWidth }}
          >
            <img src={parkImg} style={{ height: 400, width: '100%' }} />
          </Box>
          <Box className={classes.box} style={{ minWidth: boxMinWidth }}>
            <SingleParkGMap
              park={park}
              googleAPIKey={key}
              style={{ height: 400, width: 525 }}
            />
          </Box>
        </Container>
        <Container>
          <PopUpWindow park={park} />
        </Container>
        <Typography variant='h6' color='primary'>
          Park Description:
        </Typography>
        <Typography className={classes.info}>{park.description}</Typography>
        <br />
        <Typography variant='h6' color='primary'>
          Weather Details:
        </Typography>
        <Typography className={classes.info}>{park.weatherInfo}</Typography>
        <br />
        <Typography variant='h6' color='primary'>
          States:
        </Typography>
        <Typography className={classes.info}>{park.states}</Typography>
        <br />
        <Typography variant='h6' color='primary'>
          Email Contact:
        </Typography>
        <Typography className={classes.info}>{park.emailAddress}</Typography>
        <br />
        <Typography variant='h6' color='primary'>
          Entrance Fees:
        </Typography>
        <List>
          {park.entranceFees.map((fee, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <FilterHdrIcon color='secondary' />
              </ListItemIcon>
              <ListItemText primary={`$${fee.cost} - ${fee.description}`} />
            </ListItem>
          ))}
        </List>
        <br />
        <Typography variant='h6' color='primary'>
          Notable Interests:
        </Typography>
        <Grid container>
          {allCols.map((col) => (
            <Grid item>
              <List>
                {col.map((topic, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <FilterHdrIcon color='secondary' />
                    </ListItemIcon>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

const mapState = (state) => {
  return {
    park: state.park,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getParkInfo: (parkName) => dispatch(fetchParkThunk(parkName)),
    clearPark: () => dispatch(clearPark()),
  };
};

export default connect(mapState, mapDispatch)(SingleParkPage);
