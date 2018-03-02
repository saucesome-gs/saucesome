const router = require('express').Router();
const { OrderItem, Order } = require('../db/models');


router.post('/', (req, res, next) => {
  console.log(req.body)
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
  const items = req.body;
  items.map(item =>
    OrderItem.create(item)
    .then(createdItem => console.log(createdItem.data)))
    res.sendStatus(200);
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


module.exports = router;

