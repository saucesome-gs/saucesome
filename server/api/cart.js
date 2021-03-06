const router = require('express').Router();
const { OrderItem, Order } = require('../db/models');


router.post('/', (req, res, next) => {
  Order.findOrCreate({
    where: {
      userId: req.body.userId,
      status: 'pending'
    },
    include: { all: true }
  })
  .then(order => res.json(order[0]));
})

// cannot pass in order, need to get it; this route is for adding items to an existing order
router.post('/:orderId', (req, res, next) => {
  const item = req.body;
    OrderItem.create(item)
    .then(() =>
    res.sendStatus(200));
})

router.get('/:userId', (req, res, next) => {
  Order.findOrCreate({
    where: {
      userId: req.params.userId,
      status: 'pending'
    },
    include: { all: true }
  })
  .then(order => res.json(order[0]));
})

router.put('/', (req, res, next) => {
  OrderItem.findOne({
    where: req.body
  })
  .then((foundItem) => {
    foundItem.destroy()
  })
  .then(() =>
  res.status(204).send('Found and deleted'))
  .catch(next);
  })


module.exports = router;

