import axios from 'axios';

const GET_PARKS = 'GET_PARKS';

const getParks = (parks) => ({
  type: GET_PARKS,
  parks
})

export const fetchParksThunk = () => {
  return async (dispatch) => {
    try {
      console.log('parks')
      const { data } = await axios.get(`/api/parks`)
      dispatch(getParks(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = [];

export default function parksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PARKS:
      return action.parks;
    default:
      return state;
  }
}
