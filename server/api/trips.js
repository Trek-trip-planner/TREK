const router = require('express').Router();
const {
  models: { Trip, Trip_StartingPt, User, Park },
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
      include: [{ model: Park }, { model: Trip_StartingPt }],
    });
    res.json(trip);
  } catch (error) {
    next(error);
  }
});

//TESTED W/ POSTMAN - WORKS
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
