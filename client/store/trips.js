import axios from 'axios';
import history from '../history';
import { getTrip, clearTrip } from './trip';

const getToken = () => {
  const token = window.localStorage.getItem('token');
  const headers = {
    headers: {
      authorization: token,
    },
  };
  return headers;
};

const GET_TRIPS = 'GET_TRIPS';
const DELETE_TRIP = 'DELETE_TRIP';
const UPDATED_TRIP = 'UPDATED_TRIP';

export const updateTrip = (updatedtrip) => {
  return {
    type: UPDATED_TRIP,
    updatedtrip,
  };
};

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
      const { data } = await axios.get(`/api/mytrips`, getToken(), {
        params: { userId: userId },
      });
      dispatch(getTrips(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTripThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data: trip } = await axios.delete(
        `/api/mytrips/${id}`,
        getToken()
      );
      dispatch(removeTrip(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editTrip = (tripInfo) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        '/api/mytrips/editTrip',
        tripInfo,
        getToken()
      );
      dispatch(updateTrip(data));
      dispatch(clearTrip());
    } catch (error) {
      dispatch(getTrip({ error: error }));
    }
  };
};

export function addTrip(trip, park) {
  return async function (dispatch) {
    try {
      const { data } = await axios.put(
        `/api/mytrips/${trip.id}/addTrip`,
        park,
        getToken()
      );
      dispatch(updateTrip(data));
      history.push(`/mytrips/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };
}

export function removeParkFromTrip(trip, park) {
  return async function (dispatch) {
    try {
      const { data } = await axios.delete(
        `/api/mytrips/removePark/${trip}/${park}`,
        getToken()
      );
      dispatch(updateTrip(data));
    } catch (error) {
      console.log(error);
    }
  };
}
const initialState = [];

export default function tripsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRIPS:
      return action.trips;
    case DELETE_TRIP:
      const updatedTrips = [...state].filter((trip) => trip.id !== action.id);
      return updatedTrips;
    case UPDATED_TRIP:
      return state.map((trip) => {
        if (trip.id === action.updatedtrip.id) {
          return action.updatedtrip;
        }
        return trip;
      });
    default:
      return state;
  }
}
