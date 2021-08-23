import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import history from '../history';

import SearchBar from './Searchbar';

import { logout } from '../store/auth';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'unset',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
    edge: 'end',
  },
  logo: {
    maxWidth: 60,
    cursor: 'pointer',
    padding: 7,
    display: 'flex',
  },
}));

function Navbar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Typography edge='start'>
          <img
            src={'/favicon-02.png'}
            alt='logo'
            className={classes.logo + ' logo'}
            onClick={() => history.push('/')}
          />
        </Typography>
        <div>
          <SearchBar />
        </div>
        <div>
          <Button
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MenuIcon className={classes.menuButton} />
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {!props.isLoggedIn && [
              <MenuItem key={'login'} onClick={() => history.push('/login')}>
                Login
              </MenuItem>,
              <MenuItem key={'signup'} onClick={() => history.push('/signup')}>
                Sign Up
              </MenuItem>,
            ]}
            {props.isLoggedIn && [
              <MenuItem key={'mytrips'} onClick={() => history.push('/login')}>
                My Trips
              </MenuItem>,
              <MenuItem
                key={'account'}
                onClick={() => history.push('/account')}
              >
                Account
              </MenuItem>,
              <MenuItem key={'logout'} onClick={props.handleClick}>
                Logout
              </MenuItem>,
            ]}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
