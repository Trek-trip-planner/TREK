//this is the access point for all things database related!

const db = require("./db");

//Models
const User = require("./models/User");
const Trip = require("./models/Trip");
const Trip_StartingPt = require("./models/Trip_StartingPt");
const Park = require("./models/Park");
const EntranceFees = require("./models/EntranceFees");
const Image = require("./models/Image");

//associations
User.hasMany(Trip);
Trip.belongsTo(User);

Trip_StartingPt.hasMany(Trip);
Trip.belongsTo(Trip_StartingPt);

Trip.belongsToMany(Park, { through: "trip-park" });
Park.belongsToMany(Trip, { through: "trip-park" });

Park.hasMany(EntranceFees)
EntranceFees.belongsTo(Park)

Park.hasMany(Image)
Image.belongsTo(Park)

module.exports = {
  db,
  models: {
    User,
    Trip,
    Trip_StartingPt,
    Park,
    EntranceFees,
    Image,
  },
};
