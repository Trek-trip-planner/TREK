import axios from 'axios';
import history from '../history';

const GET_TRIPS = 'GET_TRIPS';
const DELETE_TRIP = 'DELETE_TRIP';

const getTrips = (trips) => ({
  type: GET_TRIPS,
  trips,
});
export const removeTrip = (id) => {
  return {
    type: DELETE_TRIP,
    id,
  };
};

export const fetchTrips = (userId) => {
  return async (dispatch) => {
    try {
      console.log('user', userId);
      const { data } = await axios.get(`/api/mytrips/${userId}`);

      dispatch(getTrips(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteTripThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data: trip } = await axios.delete(`/api/mytrips/${id}`);
      dispatch(removeTrip(trip));
      history.go();
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default function tripsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRIPS:
      return action.trips;
    case DELETE_TRIP:
      const updatedTrips = [...state].filter((trip) => trip.id !== action.id);
      return updatedTrips;
    default:
      return state;
  }
}
