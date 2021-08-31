import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    justifyContent: 'center',
    display: 'flex',
  },
}));
export default function ErrorPage() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <Alert severity='error' variant='filled'>
          <AlertTitle>Error</AlertTitle>
          This National Park is not within driving distance of your starting
          location.
        </Alert>
        <div className={classes.button}>
          <Button color='primary' variant='contained'>
            <Link id='errorButton' to={`/all-parks`}>
              See Other Parks
            </Link>
          </Button>
        </div>
        <div className={classes.button}>
          <img src='/Trek-logo-01.png' />
        </div>
      </div>
    </div>
  );
}
