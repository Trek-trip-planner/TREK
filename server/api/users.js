const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'] //information we do want back, and hide away all the rest from our client!
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
