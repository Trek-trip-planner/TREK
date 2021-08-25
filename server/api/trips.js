const router = require('express').Router();
const {
  models: { Trip},
} = require('../db');

router.get('/:userId', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({where:{userId:req.params.userId}});
    res.json(trips);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if(!trip) {
      next({status:403})
    }
    await trip.destroy();
    res.json(trip);
  } catch (error) {
    next(error);
  }
});

module.exports = router;