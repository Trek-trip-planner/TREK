import axios from 'axios';

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

const initialState = {};

export default function tripReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRIP:
      return action.trip;
    default:
      return state;
  }
}
