const Sequelize = require("sequelize");
const db = require("../db");

const Park = db.define("park", {
  fullName: {
    type: Sequelize.STRING,
  },
  latitude: {
    type: Sequelize.STRING,
  },
  longittude: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  weatherInfo: {
    type: Sequelize.STRING,
  },
  standardHours: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  topics: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  states: {
    type: Sequelize.STRING,
  },
  emailAddress: {
    type: Sequelize.STRING,
  },
});

module.exports = Park;
