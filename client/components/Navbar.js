import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import history from '../history';
import SearchBar from './Searchbar';

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
    maxWidth: 100,
    cursor: 'pointer',
  },
}));

function Navbar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoggedIn] = React.useState();

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
            src={'/favicon-02.jpg'}
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
            {!isLoggedIn && (
              <React.Fragment>
                <MenuItem onClick={() => history.push('/login')}>
                  Login
                </MenuItem>
                <MenuItem onClick={() => history.push('/signup')}>
                  Sign Up
                </MenuItem>
              </React.Fragment>
            )}
            {isLoggedIn && (
              <React.Fragment>
                <MenuItem onClick={() => history.push('/login')}>
                  My Trips
                </MenuItem>
                <MenuItem onClick={() => history.push('/account')}>
                  Account
                </MenuItem>
                <MenuItem onClick={() => history.push('/logout')}>
                  Logout
                </MenuItem>
              </React.Fragment>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
