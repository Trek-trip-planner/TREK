const router = require('express').Router();
const {
  models: { Trip, Trip_StartingPt, User, Park },
} = require('../db');
const { requireToken, isLoggedIn } = require('./middleware');

router.get('/', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (req.user.dataValues.id === user.id) {
      const trips = await Trip.findAll({
        where: { userId: user.id },
        include: { model: Trip_StartingPt },
      });
      res.json(trips);
    }
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

//need error handling here for sequelize validation failure
router.post('/addTrip', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    console.log('INSIDE ADD TRIP EXPRESS ROUTE');
    const user = await User.findByToken(req.headers.authorization);
    if (req.user.dataValues.id === user.id) {
      const [instance, wasCreated] = await Trip_StartingPt.findOrCreate({
        where: {
          address: req.body.startingPoint,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          country: req.body.country,
        },
      });

      const newTripInfo = {
        name: req.body.tripName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      };

      const newTrip = await Trip.create(newTripInfo);

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
    next({ status: 403, message: 'Forbidden' });
  } catch (error) {
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeDatabaseError'
    ) {
      next({
        status: 401,
        message: 'Please provide a valid zip code.',
      });
    }
    next(error);
  }
});

//need error handling here for sequelize validation failure
router.put('/editTrip', async (req, res, next) => {
  try {
    //updating starting point (works but on larger scale might not be the best soultion)
    const startingPoint = await Trip_StartingPt.findByPk(
      req.body.startingPointID,
      { include: Trip }
    );
    const fullAddress = {
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: Number(req.body.zip),
      country: req.body.country,
    };

    const toEditAddress =
      startingPoint.address === fullAddress.address &&
      startingPoint.city === fullAddress.city &&
      startingPoint.state === fullAddress.state &&
      startingPoint.zip === fullAddress.zip &&
      startingPoint.country === fullAddress.country;

    if (!toEditAddress) {
      const exist = await Trip_StartingPt.findOne({
        where: fullAddress,
      });

      if (exist) {
        await exist.addTrip(req.body.tripId);
        if (startingPoint.trips.length > 1) {
          await startingPoint.removeTrip(req.body.tripId);
        } else {
          await startingPoint.destroy();
        }
      } else {
        if (startingPoint.trips.length > 1) {
          const newAddress = await Trip_StartingPt.create(fullAddress);
          await newAddress.addTrip(req.body.tripId);
        } else {
          await startingPoint.update(fullAddress);
        }
      }
    }

    //updating name & date(s)
    const trip = await Trip.findByPk(req.body.tripId, {
      include: { model: Trip_StartingPt },
    });

    if (!trip) {
      return next({
        status: 404,
        message: `Trip with id ${req.body.tripId} not found.`,
      });
    }
    await trip.update(req.body);
    res.json(trip);
  } catch (error) {
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeDatabaseError'
    ) {
      next({
        status: 401,
        message: 'Please provide valid zip code',
      });
    }
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
