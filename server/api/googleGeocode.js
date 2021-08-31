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

  console.log('GOOGLE KEY: ', googleKey);

  let oneLineAddress = Object.keys(addressInfo)
    .map((key) => {
      let value = addressInfo[key];
      value = value.split(' ').join('+');
      return value;
    })
    .join('+');

  console.log('One Line Address: ', oneLineAddress);

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
    console.log('STATUS OF GEOCODE RESULT: ', results.data.status);
    console.log('FULL DATA RECEIVED BACK: ', JSON.stringify(results.data));
  } catch (error) {
    console.log('Error with google geocode request: ', error);
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
