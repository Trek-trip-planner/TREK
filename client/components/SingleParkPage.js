import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { fetchParkThunk, clearPark } from '../store/park';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import PopUpWindow from './PopUpWindow';
import SingleParkMap from './SingleParkMap';

const useStyles = makeStyles((theme) => ({
  info: {
    padding: 10,
  },
  gridLeft: {
    padding: 10,
  },
  gridRight: {
    padding: 10,
  },
  mapContainer: {
    height: 500,
    width: 700,
    padding: 5,
  },
}));

function SingleParkPage(props) {
  const { park, getParkInfo } = props;
  const parkName = props.match.params.parkName;
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      await getParkInfo(parkName);
    })();
    return () => props.clearPark();
  }, [parkName]);

  if (!park.id) {
    return <Typography align='center'>Loading...</Typography>;
  }

  const parkImg = park.images.length ? park.images[0].url : '/Trek-logo-01.png';

  return (
    <Container component='main' style={{ margin: 10 }} maxWidth={false}>
      <Grid
        container
        justifyContent='space-around'
        alignItems='center'
        spacing={3}
        style={{ margin: 10, wrap: 'noWrap' }}
      >
        {/* <Grid item xs={6}> */}
        <Card display='flex' style={{ padding: 5 }}>
          <CardHeader title={park.fullName} align='center' />
          <CardMedia
            image={parkImg}
            title={park.fullName}
            style={{ height: 500, width: 700 }}
          />
          <CardContent>
            <PopUpWindow park={park} />
          </CardContent>
        </Card>
        {/* </Grid> */}
        <Grid item xs={6} className={classes.mapContainer}>
          <Paper elevation={3}>
            <SingleParkMap park={park} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent='flex-start' style={{ margin: 10 }}>
        <Grid item xs={6} className={classes.gridLeft}>
          <Typography variant='h6'>Park Description:</Typography>
          <Typography className={classes.info}>{park.description}</Typography>
          <Typography variant='h6'>Weather Details:</Typography>
          <Typography className={classes.info}>{park.weatherInfo}</Typography>
          <Typography variant='h6'>Notable Interests:</Typography>
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
        <Grid item xs={6} className={classes.gridRight}>
          <Typography variant='h6'>States:</Typography>
          <Typography className={classes.info}>{park.states}</Typography>
          <Typography variant='h6'>Email Contact:</Typography>
          <Typography className={classes.info}>{park.emailAddress}</Typography>
          <Typography variant='h6'>Entrance Fees:</Typography>
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
