const router = require('express').Router();
const {
  models: { Trip,User},
} = require('../db');



router.get('/', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({include:{model:User}});
    res.json(trips);
  } catch (error) {
    next(error);
  }
});

module.exports = router;