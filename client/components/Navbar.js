import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
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
import Box from '@material-ui/core/Box';
import { useMediaQuery, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'unset',
  },
  contain: {
    padding: 0,
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
  welcome: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const { firstName } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const windowWidth = window.outerWidth;

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Typography edge='start' variant='h6'>
          <img
            src={'/favicon-02.png'}
            alt='logo'
            className={classes.logo + ' logo'}
            onClick={() => history.push('/')}
          />
        </Typography>
        {windowWidth > 760 && (
          <div className='search-bar-container'>
            <SearchBar />
          </div>
        )}
        <div className={classes.welcome} variant='h6'>
          <Box>
            {props.isLoggedIn && <Typography>Welcome {firstName}! </Typography>}
          </Box>

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
              <MenuItem key={'about'} onClick={() => history.push('/about')}>
                About Trek
              </MenuItem>,
              <MenuItem key={'login'} onClick={() => history.push('/login')}>
                Login
              </MenuItem>,
              <MenuItem key={'signup'} onClick={() => history.push('/signup')}>
                Sign Up
              </MenuItem>,
            ]}
            {props.isLoggedIn && [
              <MenuItem key={'about'} onClick={() => history.push('/about')}>
                About Trek
              </MenuItem>,
              <MenuItem
                key={'mytrips'}
                onClick={() => history.push('/mytrips')}
              >
                My Trips
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
    firstName: state.auth.firstName,
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
