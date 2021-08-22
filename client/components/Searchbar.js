import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    position: 'relative',
    backgroundColor: 'white',
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
    backgroundColor: theme.palette.secondary.main,
    height: '100%',
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

function Searchbar() {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Autocomplete
        className={classes.inputInput}
        options={top25Parks}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(park) => (
          <TextField
            {...park}
            onChange={handleSearchChange}
            variant='outlined'
          />
        )}
      />
    </div>
  );
}
const top25Parks = [
  { name: 'Olympic National Park' },
  { name: 'Mount Rainier National Park' },
  { name: 'John Day Fossil Beds National Monument' },
  { name: 'Crater Lake National Park' },
  { name: 'Yosemite National Park' },
  { name: 'Sequoia & Kings Canyon National Parks' },
  { name: 'Death Valley National Park' },
  { name: 'Joshua Tree National Park' },
  { name: 'Glacier National Park' },
  { name: 'Yellowstone National Park' },
  { name: 'Grand Teton National Park' },
  { name: 'Rocky Mountain National Park ' },
  { name: 'Great Sand Dunes National Park & Preserve' },
  { name: 'Mesa Verde National Park' },
  { name: 'Arches National Park' },
  { name: 'Capitol Reef National Park' },
  { name: 'Bryce Canyon National Park' },
  { name: 'Zion National Park' },
  { name: 'Grand Canyon National Park' },
  { name: 'Canyon De Chelly National Monument' },
  { name: 'Saguaro National Park' },
  { name: 'White Sands National Monument' },
  { name: 'Guadalupe Mountains National Park' },
  { name: 'Big Bend National Park' },
  { name: 'Scotts Bluff National Monument' },
];

export default Searchbar;
