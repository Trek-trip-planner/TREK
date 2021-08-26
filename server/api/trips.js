const router = require('express').Router();
const {
  models: { Trip, Trip_StartingPt, User, Park },
} = require('../db');
const { requireToken, isLoggedIn } = require('./middleware');

router.get('/', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      where: { userId: req.query.userId },
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (req.user.dataValues.id === user.id) {
      const trip = await Trip.findByPk(req.params.id, {
        include: [{ model: Park }, { model: Trip_StartingPt }],
      });
      if (!trip) {
        next({ status: 404 });
      } else if (trip.userId !== user.id) {
        next({
          status: 403,
          message: 'You are not authorized to view this trip',
        });
      } else {
        res.json(trip);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post('/addTrip', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (req.user.dataValues.id === user.id) {
      const newTripInfo = {
        name: req.body.tripName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      };
      const newTrip = await Trip.create(newTripInfo);

      const [instance, wasCreated] = await Trip_StartingPt.findOrCreate({
        where: {
          address: req.body.startingPoint,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          country: req.body.country,
        },
      });

      instance.addTrip(newTrip);

      const user = await User.findByPk(req.body.userId);
      const park = await Park.findByPk(req.body.parkId);

      await user.addTrip(newTrip);
      await newTrip.addPark(park);
      await park.addTrip(newTrip);

      const trip = await Trip.findByPk(newTrip.id, {
        include: [{ model: Park }, { model: Trip_StartingPt }],
      });

      res.send(trip);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (req.user.dataValues.id === user.id) {
      const trip = await Trip.findByPk(req.params.id);
      if (!trip) {
        next({ status: 403 });
      }
      await trip.destroy();
      res.json(trip);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
