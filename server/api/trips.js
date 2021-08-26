const router = require('express').Router();
const {
  models: { Trip, Trip_StartingPt, User, Park },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      where: { userId: req.query.userId },
      include: { model: Trip_StartingPt },
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.id, {
      include: [{ model: Park }, { model: Trip_StartingPt }],
    });
    res.json(trip);
  } catch (error) {
    next(error);
  }
});

router.post('/addTrip', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

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
      zip: req.body.zip,
      country: req.body.country,
    };
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

    //Works but not the best
    // const [instance, wasCreated] = await Trip_StartingPt.findOrCreate({
    //   where: fullAddress,
    // });

    // await instance.addTrip(req.body.tripId);

    // if (startingPoint.trips.length > 1) {
    //   await startingPoint.removeTrip(req.body.tripId);
    // } else {
    //   await startingPoint.destroy();
    // }

    //   if (exist) {
    //     exist.addTrip(req.body.tripId);
    //   } else {
    //     const [numOfAffectedRows, affectedRows] = await Trip_StartingPt.update(
    //       req.body,
    //       {
    //         where: { id: req.body.startingPointID },
    //         returning: true,
    //       }
    //     );
    //     if (!numOfAffectedRows) {
    //       return next({
    //         status: 404,
    //         message: `Starting point with id ${req.body.startingPointID} not found.`,
    //       });
    //     }
    //   }
    // } else {
    //   const [instance, wasCreated] = await Trip_StartingPt.findOrCreate({
    //     where: fullAddress,
    //   });
    //   instance.addTrip(req.body.tripId);
    // }

    //updating name & date(s)
    const [numOfAffectedRows, affectedRows] = await Trip.update(req.body, {
      where: { id: req.body.tripId },
      include: { model: Trip_StartingPt },
      returning: true,
    });
    if (!numOfAffectedRows) {
      return next({
        status: 404,
        message: `Trip with id ${tripId} not found.`,
      });
    }
    res.json(affectedRows);
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
    res.json(trip);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
