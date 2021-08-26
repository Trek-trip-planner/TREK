const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const { requireToken, isLoggedIn } = require('./middleware');
module.exports = router;

router.get('/', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
