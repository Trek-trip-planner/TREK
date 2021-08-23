import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Box,
  Grid,
  Button,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
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
        justifyContent='space-between'
        alignItems='center'
        style={{ margin: 10 }}
      >
        <Grid item xs={6}>
          <Typography variant='h4' gutterBottom>
            Zion National Park
          </Typography>
          <Grid style={{ width: 500, height: 500 }}>
            <Image src='/home-imgs/ZionNP.jpg' />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography>Map Render Area</Typography>
          <Typography>Line 2</Typography>
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
