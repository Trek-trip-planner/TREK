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
  Paper,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { fetchParkThunk, clearPark } from '../store/park';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import PopUpWindow from './PopUpWindow';
import SingleParkGMap from './SingleParkGMap';
import getKey from './googleKey';

const useStyles = makeStyles((theme) => ({
  // mapContainer: {
  //   height: 'fit-container',
  //   width: 'fit-container',
  // },
  root: {
    margin: 0,
    padding: 0,
  },
  parkTitle: {
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  grid: {
    padding: 30,
  },
  topDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 30,
    alignItems: 'flex-start',
  },
}));

function SingleParkPage(props) {
  const { park, getParkInfo } = props;
  const parkName = props.match.params.parkName;
  const classes = useStyles();
  const [key, setKey] = useState(null);

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
    return <Typography align='center'>Loading...</Typography>;
  }

  const parkImg = park.images.length ? park.images[0].url : '/Trek-logo-01.png';

  return (
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
        <Card display='flex'>
          <CardMedia
            image={parkImg}
            title={park.fullName}
            style={{ height: 400, width: 600 }}
          />
          <CardContent>
            <PopUpWindow park={park} />
          </CardContent>
        </Card>
        <Grid item xs={6} style={{ height: 400, width: 600 }}>
          <Paper elevation={3}>
            <SingleParkGMap park={park} googleAPIKey={key} />
          </Paper>
        </Grid>
      </Container>
      <Grid container justifyContent='flex-start' className={classes.grid}>
        <Grid item xs={6}>
          <Typography variant='h6' color='primary'>
            Park Description:
          </Typography>
          <Typography className={classes.info}>{park.description}</Typography>
          <Typography variant='h6' color='primary'>
            Weather Details:
          </Typography>
          <Typography className={classes.info}>{park.weatherInfo}</Typography>
          <Typography variant='h6' color='primary'>
            Notable Interests:
          </Typography>
          <List>
            {park.topics.map((topic, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FilterHdrIcon color='secondary' />
                </ListItemIcon>
                <ListItemText primary={topic} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' color='primary'>
            States:
          </Typography>
          <Typography className={classes.info}>{park.states}</Typography>
          <Typography variant='h6' color='primary'>
            Email Contact:
          </Typography>
          <Typography className={classes.info}>{park.emailAddress}</Typography>
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
        </Grid>
      </Grid>
    </Container>
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
