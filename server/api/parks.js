const router = require('express').Router();
const {
  models: { Park, Image },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const parks = await Park.findAll({ include: { model: Image } });
    res.json(parks);
  } catch (error) {
    next(error);
  }
});

router.get('/:parkName', async (req, res, next) => {
  try {
    const park = await Park.findByPk(req.params.id);
    if (!park) {
      res.sendStatus(404);
    }
    res.status(200).json(park);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
