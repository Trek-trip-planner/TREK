const Sequelize = require("sequelize");
const db = require("../db");

const Trip_StartingPt = db.define("trip_StartingPt", {
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
  },
  country: {
    type: Sequelize.STRING,
    defaultValue: "United States",
  },
});

module.exports = Trip_StartingPt;
