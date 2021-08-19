const Sequelize = require("sequelize");
const db = require("../db");

const EntranceFees = db.define("entranceFees", {
  cost: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
});

module.exports = EntranceFees;
