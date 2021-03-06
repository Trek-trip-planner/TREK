import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import history from '../history';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchParksThunk } from '../store/parks';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    position: 'relative',
    color: 'white',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    borderRadius: theme.shape.borderRadius,
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '20ch',
    },
  },
}));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
      '&.MuiInputBase-root': {
        color: 'white',
      },
    },
  },
})(TextField);

function Searchbar(props) {
  const classes = useStyles();
  const [search, setSearch] = useState(null);

  useEffect(() => {
    (async () => {
      const parks = await props.getParks();
    })();
  }, []);

  function valueChange(event, value) {
    let parkName = value.fullName.split(' ').join('_');
    history.push(`/${parkName}`);
  }

  return (
    <div className={classes.search}>
      <Autocomplete
        onChange={(event, value) => valueChange(event, value)}
        className={classes.inputInput}
        value={search}
        options={props.parks}
        getOptionLabel={(park) => park.fullName}
        style={{ width: 300 }}
        renderInput={(park) => (
          <CssTextField
            {...park}
            label='Search...'
            variant='outlined'
            styles={{ color: 'white' }}
          />
        )}
      />
      <Button>
        <div className={classes.searchIcon}>
          <SearchIcon styles={{ color: 'white' }} />
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
