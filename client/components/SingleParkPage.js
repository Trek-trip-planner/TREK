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
import Image from 'material-ui-image';
import { fetchParkThunk } from '../store/park';
import CheckIcon from '@material-ui/icons/Check';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import PopUpWindow from './PopUpWindow';

function SingleParkPage(props) {
  const { park, getParkInfo } = props;
  const parkName = props.match.params.parkName;
  useEffect(() => {
    (async () => {
      await getParkInfo(parkName);
    })();
  }, [parkName]);

  if (!park.id) {
    return <Typography>Loading...</Typography>;
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
          <CardHeader title={park.fullName} />
          <CardMedia
            image={parkImg}
            title={park.fullName}
            style={{ height: 500, width: 700 }}
          />
          <CardContent>
            <PopUpWindow />
          </CardContent>
        </Card>
        {/* </Grid> */}
        <Grid item xs={6} style={{ padding: 5 }}>
          <Paper elevation={3}>
            <Typography>Map Render Area</Typography>
            <Typography>Line 2</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent='flex-start' style={{ margin: 10 }}>
        <Grid item xs={6}>
          <Typography variant='h6'>Park Description:</Typography>
          <Typography>{park.description}</Typography>
          <Typography variant='h6'>Weather Details:</Typography>
          <Typography>{park.weatherInfo}</Typography>
          <Typography variant='h6'>Notable Interests:</Typography>
          <List>
            {park.topics.map((topic, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FilterHdrIcon />
                </ListItemIcon>
                <ListItemText primary={topic} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6'>States:</Typography>
          <Typography>{park.states}</Typography>
          <Typography variant='h6'>Email Contact:</Typography>
          <Typography>{park.emailAddress}</Typography>
          <Typography variant='h6'>Entrance Fees:</Typography>
          <List>
            {park.entranceFees.map((fee, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FilterHdrIcon />
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
  };
};

export default connect(mapState, mapDispatch)(SingleParkPage);
