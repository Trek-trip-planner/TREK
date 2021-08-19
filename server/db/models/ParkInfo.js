const Sequelize = require("sequelize");
const db = require("../db");

const ParkInfo = db.define("parkInfo", {
  fullName: {
    type: Sequelize.STRING,
  },
  latLong: {
    type: Sequelize.STRING,
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  description: {
    type: Sequelize.STRING,
  },
  directionInfo: {
    type: Sequelize.STRING,
  },
  entranceFees: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  weatherInfo: {
    type: Sequelize.STRING,
  },
  operatingHours: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  topics: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  states: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
});

module.exports = ParkInfo;
