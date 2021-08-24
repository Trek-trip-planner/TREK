// import React, { Component } from 'react';
// import Card from '@material-ui/core/Card';
// import { IconButton } from '@material-ui/core/';
// import { Delete } from '@material-ui/icons';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';


// // const row = (x, i, header) =>
// //   <TableRow key={`tr-${i}`}>
// //     {header.map((y, k) =>
// //       <TableRowColumn key={`trc-${k}`}>
// //         {x[y.prop]}
// //       </TableRowColumn>
// //     )}
// //   </TableRow>;


// export default class AddTrip extends Component {
//   render() {
//     const name = this.props.trip.name;
//     console.log('trips', name);
//     const { deleteTour } = this.props;

//     return (


//       <Card className={'root'} align='center' variant = "outlined" style = {{backgroundColor: 'lightBlue'}}>
//         <CardContent className='trip-name'>
//           <Typography variant='body6' color='textPrimary' component='p'>
//             {name}
//           </Typography>
//           <IconButton
//             edge='end'
//             aria-label='delete'
//             onClick={() => deleteTour(name)}
//           ><h6>Remove</h6>
//             <Delete />
//           </IconButton>
//         </CardContent>
//       </Card>

//     )




//   }
// }


// <Container className='account-wrapper'>
      //   <Typography
      //     variant='h4'
      //     component='h3'
      //     color='secondary'
      //     align='center'
      //     fontWeight='fontWeightBold'
      //     m={2}
      //   >
      //     <Box fontWeight='fontWeightBold' m={1}>
      //       My trips
      //     </Box>
      //   </Typography>
      //   <Grid container spacing={3}>

      //     {trips.length !== 0 ? (
      //       trips.map((trip) => (
      //         <Grid item key={trip.name} xs={12} md={6} lg={4}>
      //           <Trip trip={trip} deleteTour = {this.deleteTour} />
      //         </Grid>
      //       ))
      //     ) : (
      //       <h3>Loading</h3>
      //     )}
      //   </Grid>
      // </Container>