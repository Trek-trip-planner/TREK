const Sequelize = require('sequelize');
const db = require('../db');

const Trip_StartingPt = db.define('trip_StartingPt', {
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5],
      is: /^[0-9]{5}(?:-[0-9]{4})?$/,
      isNumeric: true,
    },
  },
  country: {
    type: Sequelize.STRING,
    defaultValue: 'United States',
  },
});

module.exports = Trip_StartingPt;
