import React, { useStyles } from 'react';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


export default function tripFormTextField() {
  return (
    <React.Fragment>
      <form onSubmit={(evt) => handleSubmit(evt, userId)}>
        <Typography variant='h6' gutterBottom>
          Trip Name:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id='tripName'
              name='tripName'
              label='Trip Name'
              fullWidth
            />
          </Grid>
        </Grid>
        <Typography variant='h6' gutterBottom style={{ paddingTop: 15 }}>
          Starting location:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id='address1'
              name='address1'
              label='Address line 1'
              fullWidth
              autoComplete='shipping address-line1'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='city'
              name='city'
              label='City'
              fullWidth
              autoComplete='shipping address-level2'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='state'
              name='state'
              label='State/Province/Region'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='zip'
              name='zip'
              label='Zip / Postal code'
              fullWidth
              autoComplete='shipping postal-code'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='country'
              name='country'
              label='Country'
              fullWidth
              autoComplete='shipping country'
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Typography variant='h6' gutterBottom style={{ paddingTop: 15 }}>
            {`Date(s):`}
          </Typography>
          <Grid item xs={12} sm={6}>
            <div noValidate>
              <TextField
                required
                id='startDate'
                label='Start Date'
                type='date'
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                required
                id='endDate'
                label='End Date'
                type='date'
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Create
        </Button>
      </form>
    </React.Fragment>
  );
}
