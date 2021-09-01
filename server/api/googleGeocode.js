const path = require('path');
const axios = require('axios');

async function verifyAddress(addressInfo) {
  let googleKey;
  if (process.env.NODE_ENV === 'production') {
    googleKey = process.env.GOOGLE_GEOCODE_KEY;
  } else {
    require('dotenv').config({
      path: path.join(__dirname, '..', '..', '.env'),
    });
    googleKey = process.env.GOOGLE_GEOCODE_KEY;
  }

  let oneLineAddress = Object.keys(addressInfo)
    .map((key) => {
      let value = addressInfo[key];
      value = value.split(' ').join('+');
      return value;
    })
    .join('+');

  const requestConfig = {
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=${googleKey}`,
    params: {
      address: oneLineAddress,
    },
  };

  let results;
  try {
    results = await axios(requestConfig);
  } catch (error) {
    throw error;
  }

  let error;
  switch (results.data.status) {
    case 'OK':
      return;
    case 'ZERO_RESULTS':
      error = Error('Please provide a valid US address.');
      error.status = 400;
      throw error;
    case 'INVALID_REQUEST':
      error = Error('Please provide a valid US address.');
      error.status = 400;
      throw error;
    default:
      error = Error(results.data.status);
      error.status = 500;
      throw error;
  }
}

module.exports = verifyAddress;
