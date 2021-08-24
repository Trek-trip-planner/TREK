import axios from 'axios';

const GET_TRIPS = 'GET_TRIPS';

const getTrips = (trips) => ({
  type: GET_TRIPS,
  trips
});

export const fetchTrips = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/mytrips`);
      dispatch(getTrips(data));
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
    default:
      return state;
  }
}
