const router = require('express').Router();
const {
  models: { Trip, Trip_StartingPt, User, Park },
} = require('../db');
const { requireToken, isLoggedIn } = require('./middleware');
const path = require('path');

const verifyAddress = require('./googleGeocode');

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

router.get('/googleKey', async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      res.send(process.env.GOOGLE_API_KEY);
    } else {
      require('dotenv').config({
        path: path.join(__dirname, '..', '..', '.env'),
      });
      res.send(process.env.GOOGLE_API_KEY);
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

//need address verification with geocoding
router.post('/addTrip', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (req.user.dataValues.id === user.id) {
      const fullAddress = {
        address: req.body.startingPoint,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
      };

      //MAKE ALL OF THIS A HELPER FUNCTION/CLASS METHOD?
      //full address verification here - if not valid next an error with appropriate code and message
      //run try catch that calls the address verification helper function - thrown errors will be caught in catch block
      try {
        verifyAddress(fullAddress);
      } catch (error) {
        next(error);
        return;
      }

      const [instance, wasCreated] = await Trip_StartingPt.findOrCreate({
        where: fullAddress,
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

      return res.send(trip);
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

//need address verification with geocoding
router.put('/editTrip', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    //updating starting point (works but on larger scale might not be the best soultion)
    const user = await User.findByToken(req.headers.authorization);
    if (req.user.dataValues.id === user.id) {
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

      //check full address here to make sure that it is valid - if not return next error with appropriate code and a message

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
      return res.json(trip);
    }
    next({ status: 403, message: 'Forbidden' });
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
