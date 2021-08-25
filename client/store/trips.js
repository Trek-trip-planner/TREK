import axios from 'axios';

const GET_TRIPS = 'GET_TRIPS';
const DELETE_TRIP = 'DELETE_TRIP'

const getTrips = (trips) => ({
  type: GET_TRIPS,
  trips
});

export const removeTrip = (id) => {
  return {
    type: DELETE_TRIP,
    id
  };
};

export const fetchTrips = (userId) => {
  return async (dispatch) => {
    try {
      console.log('user', userId)
      const { data } = await axios.get(`/api/mytrips/${userId}`);

      dispatch(getTrips(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteTripThunk = (id) => {
  return async (dispatch) => {
    const {data: trip} = await axios.delete(`/api/mytrip/${id}`);
    console.log('data', trip)
    dispatch(removeTrip(id));


  };
};


const initialState = [];

export default function tripsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRIPS:
      return action.trips;
    case DELETE_TRIP:
      const updatedTrips = [...state].filter((trip) => trip.id !== id)
      return  updatedTrips
    default:
      return state;
  }
}
