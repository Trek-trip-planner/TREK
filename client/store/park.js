import axios from 'axios';

const GET_PARK = 'GET_PARK';

const getPark = (park) => ({
  type: GET_PARK,
  park,
});

export const fetchParkThunk = (parkName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/parks/${parkName}`);
      dispatch(getPark(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

export default function parkReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PARK:
      return action.park;
    default:
      return state;
  }
}
