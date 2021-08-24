const response1 = require('./NPSResponses/NPSresponse1.json');
const response2 = require('./NPSResponses/NPSresponse2.json');
const response3 = require('./NPSResponses/NPSresponse3.json');
const response4 = require('./NPSResponses/NPSresponse4.json');
const response5 = require('./NPSResponses/NPSresponse5.json');
const response6 = require('./NPSResponses/NPSresponse6.json');
const response7 = require('./NPSResponses/NPSresponse7.json');
const response8 = require('./NPSResponses/NPSresponse8.json');
const response9 = require('./NPSResponses/NPSresponse9.json');
const response10 = require('./NPSResponses/NPSresponse10.json');

let data = [
  ...response1.data,
  ...response2.data,
  ...response3.data,
  ...response4.data,
  ...response5.data,
  ...response6.data,
  ...response7.data,
  ...response8.data,
  ...response9.data,
  ...response10.data,
];

module.exports = data;
