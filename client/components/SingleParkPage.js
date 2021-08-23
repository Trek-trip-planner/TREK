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

function SingleParkPage(props) {
  const { park, getParkInfo } = props;
  // useEffect(() => {
  //   (async () => {
  //     await getParkInfo(props.match.params.id);
  //   })();
  // }, []);

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
        <Card display='flex' justifyContent='center'>
          <CardHeader title='Zion National Park' />
          <CardMedia
            image='/home-imgs/ZionNP.jpg'
            title='Zion National Park'
            style={{ height: 500, width: 700 }}
          />
          <CardContent>
            <Button variant='contained' style={{ margin: 10 }}>
              add park to trip
            </Button>
          </CardContent>
        </Card>
        {/* </Grid> */}
        <Grid item xs={6}>
          <Paper elevation={3}>
            <Typography>Map Render Area</Typography>
            <Typography>Line 2</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent='flex-start' style={{ margin: 10 }}>
        <Grid item xs={6}>
          <Typography variant='h6'>Park Amenities:</Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Item In List' />
            </ListItem>
          </List>
          <Typography variant='h6'>Park Activities</Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary='Item In List' />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6'>Park Description:</Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary='Item In List' />
            </ListItem>
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
    getParkInfo: (parkId) => dispatch(fetchParkThunk(parkId)),
  };
};

export default connect(mapState, mapDispatch)(SingleParkPage);
