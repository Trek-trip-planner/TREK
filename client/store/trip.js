import axios from 'axios';
import history from '../history';

const GET_TRIP = 'GET_TRIP';

const getTrip = (trip) => ({
  type: GET_TRIP,
  trip,
});

export const fetchTrip = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/mytrips/${id}`);
      dispatch(getTrip(data));
    } catch (error) {
      console.log(error);
    }
  };
};
const CLEAR_TRIP = 'CLEAR_TRIP';

export const clearTrip = () => {
  return {
    type: CLEAR_TRIP,
  };
};

export const createNewTrip = (tripInfo) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/mytrips/addTrip', tripInfo);
      dispatch(getTrip(data));
      history.push(`/mytrips/${data.id}`);
    } catch (error) {
      console.log('Error fetching single trip: ', error.message);
    }
  };
};

const initialState = {};

export default function tripReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRIP:
      return action.trip;
    case CLEAR_TRIP:
      return {};
    default:
      return state;
  }
}
