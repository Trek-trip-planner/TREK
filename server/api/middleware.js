const {
  models: { User, Trip },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const isLoggedIn = (req, res, next) => {
  if (!req.user.id) {
    next({
      status: 403,
      message: 'You must be a logged-in user to access this page!',
    });
  } else {
    next();
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('You shall not pass!');
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isLoggedIn,
  isAdmin,
};
