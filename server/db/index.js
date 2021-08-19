//this is the access point for all things database related!

const db = require("./db");

//Models
const User = require("./models/User");
const Trip = require("./models/Trip");
const Trip_StartingPt = require("./models/Trip_StartingPt");
const ParkInfo = require("./models/ParkInfo");

//associations
User.hasMany(Trip);
Trip.belongsTo(User);

Trip_StartingPt.hasMany(Trip);
Trip.belongsTo(Trip_StartingPt);

Trip.belongsToMany(ParkInfo, { through: "trip-park" });
ParkInfo.belongsToMany(Trip, { through: "trip-park" });

module.exports = {
  db,
  models: {
    User,
    Trip,
    Trip_StartingPt,
    ParkInfo,
  },
};
