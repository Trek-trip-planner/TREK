import axios from 'axios';
import { getToken } from '../store/trip';

async function getKey() {
  const { data } = await axios.get('/api/mytrips/googleKey', getToken());
  return data;
}

export default getKey;
