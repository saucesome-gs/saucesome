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

router.put('/:userid', (req, res, next) => {
  User.update({
    status: req.body.status
  }, {
    where: {id: req.params.orderId},
  })
  .then(updatedOrder => {
    res.status(200).json(updatedOrder)
  })
  .catch(next);
})

router.delete('/:userid', isAdmin, (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.userid
    }
  })
  .then((foundItem) => {
    foundItem.destroy()
  })
  .then(() =>
  res.status(204).send('Found and deleted'))
  .catch(next);
})
