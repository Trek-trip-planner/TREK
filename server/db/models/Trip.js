const Sequelize = require('sequelize');
const db = require('../db');

const Trip = db.define('trip', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'Trip',
  },
  startDate: {
    type: Sequelize.STRING,
  },
  endDate: {
    type: Sequelize.STRING,
  },
});

module.exports = Trip;
