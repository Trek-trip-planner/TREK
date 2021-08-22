import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchParksThunk } from '../store/parks';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginTop: '5px',
    marginBottom: '5px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1.5),
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.secondary.main,
    height: '70%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '20ch',
    },
  },
}));

function Searchbar(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    (async () => {
      const parks = await props.getParks();
    })();
  }, []);

  // function handleClick(searchValue) {
  //   console.log('searchValue', searchValue);
  // }
  function onInputChange(event, value) {
    console.log('value', value);
  }

  return (
    <div className={classes.search}>
      <Autocomplete
        onInputChange={onInputChange}
        className={classes.inputInput}
        options={props.parks}
        getOptionLabel={(park) => park.fullName}
        style={{ width: 300 }}
        renderInput={(park) => <TextField {...park} variant='outlined' />}
      />
      <Button>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
      </Button>
    </div>
  );
}
const mapState = (state) => {
  return {
    parks: state.parks,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getParks: () => dispatch(fetchParksThunk()),
  };
};

export default connect(mapState, mapDispatch)(Searchbar);
