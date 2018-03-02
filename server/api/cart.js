const router = require('express').Router();
const { OrderItem, Order } = require('../db/models');


router.post('/', (req, res, next) => {
  Order.create(req.body)
  .then(createdOrder => res.json(createdOrder));
})

// cannot pass in order, need to get it
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
      userId: req.params.id,
      status: 'pending'
    }
  })
  .then(order => res.json(order));
})

module.exports = router;

