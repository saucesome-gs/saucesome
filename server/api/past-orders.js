const router = require('express').Router();
const { OrderItem, Order } = require('../db/models');

router.get('/', (req, res, next) => {
  Order.findAll()
  .then(foundOrders => res.json(foundOrders));
})

router.get('/user/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
      status: {
        $ne: 'pending'
      }
    },
    raw: true
  })
  .then(foundOrders => res.json(foundOrders));
})

router.get('/:status', (req, res, next) => {
  if (typeof req.params.status !== 'string') return next();
  Order.findAll({
    where: {
      status: req.params.status
    },
  })
  .then((foundOrders) => {
    res.json(foundOrders);
  })
})

router.get('/order/:orderId', (req, res, next) => {
  console.log('in back end')
  OrderItem.findAll({
    where: {
      orderId: req.params.orderId
    },
    include: [{all: true}]
  })
  .then(foundItems => res.json(foundItems))
  .catch(next);
})


module.exports = router;

