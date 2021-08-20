const Sequelize = require('sequelize');
const db = require('../db');

const Park = db.define('park', {
  fullName: {
    type: Sequelize.STRING,
  },
  latitude: {
    type: Sequelize.STRING,
  },
  longitude: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  weatherInfo: {
    type: Sequelize.TEXT,
  },
  standardHours: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  topics: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  states: {
    type: Sequelize.STRING,
  },
  emailAddress: {
    type: Sequelize.STRING,
  },
  npsParkId: Sequelize.STRING,
});

module.exports = Park;
