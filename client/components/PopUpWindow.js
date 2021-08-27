import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CreateTrip from './CreateTrip';
import history from '../history';
import { useLocation } from 'react-router-dom';
import EditTrip from './EditTrip';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  addButton: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function PopUpWindow(props) {
  const classes = useStyles();
  let location = useLocation();

  const { park, trip } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkLogIn = props.isLoggedIn ? (
    <div>
      <CreateTrip park={park} location={location} />
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </div>
  ) : (
    <div>
      <DialogTitle id='form-dialog-title'>Sign in</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please Sign into your Trek account.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => history.push('/signup')} color='primary'>
          Sign up
        </Button>
        <Button onClick={() => history.push('/login')} color='primary'>
          Login
        </Button>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </div>
  );

  return (
    <div className={classes.addButton}>
      {location.pathname === '/mytrips' ? (
        <Button color='secondary' onClick={handleClickOpen}>
          <EditIcon color='primary' />
        </Button>
      ) : (
        <Button
          onClick={handleClickOpen}
          variant='contained'
          style={{ margin: 10 }}
          color='primary'
          className={classes.addButton}
        >
          add park to trip
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <div>
          {location.pathname === '/mytrips' ? (
            <EditTrip trip={trip} />
          ) : (
            checkLogIn
          )}
        </div>
      </Dialog>
    </div>
  );
}
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};
export default connect(mapState)(PopUpWindow);
