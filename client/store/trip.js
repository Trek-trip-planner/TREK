import axios from 'axios';

const GET_SINGLE_TRIP = 'GET_SINGLE_TRIP';
const CLEAR_TRIP = 'CLEAR_TRIP';

export const clearTrip = () => {
  return {
    type: CLEAR_TRIP,
  };
};

export const haveSingleTrip = (trip) => {
  return {
    type: GET_SINGLE_TRIP,
    trip,
  };
};

export const createNewTrip = (tripInfo) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/mytrips/addTrip', tripInfo);
      dispatch(haveSingleTrip(data));
    } catch (error) {
      console.log('Error fetching single trip: ', error.message);
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_TRIP:
      return action.trip;
    case CLEAR_TRIP:
      return {};
    default:
      return state;
  }
}
