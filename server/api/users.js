const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin){
    const err = Error('Unauthorized')
    err.status = 401;
    throw err
  }
  next();
}
router.get('/all', isAdmin, (req, res, next) => {
  User.findAll({
  })
    .then(users => res.json(users))
    .catch(next)
})
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})
