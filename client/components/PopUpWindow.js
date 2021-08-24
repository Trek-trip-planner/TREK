import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import Login from './Login';
import CreateTrip from './CreateTrip';

function PopUpWindow(props) {
  const { park } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log('this.props', props.park);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant='contained'
        style={{ margin: 10 }}
      >
        add park to trip
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <div>
          {props.isLoggedIn ? (
            <div>
              {/* <DialogTitle id='form-dialog-title'>Sign in</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please Sign into your Trek account.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Email Address'
                  type='email'
                  fullWidth
                />
              </DialogContent> */}
              <CreateTrip park={park} />
              <DialogActions>
                <Button onClick={handleClose} color='primary'>
                  Cancel
                </Button>
              </DialogActions>
            </div>
          ) : (
            <div>
              <Login />
              <DialogActions>
                <Button onClick={handleClose} color='primary'>
                  Cancel
                </Button>
              </DialogActions>
            </div>
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
