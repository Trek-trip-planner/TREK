const router = require('express').Router();
const {
  models: { Trip, Trip_StartingPt },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({ where: { userId: req.query.userId } });
    res.json(trips);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.id, {
      include: { model: Trip_StartingPt },
    });
    res.json(trip);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) {
      next({ status: 403 });
    }
    await trip.destroy();
    res.sendStatus(200).json(trip);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
