const router = require('express').Router();
const { OrderItem, Order } = require('../db/models');

router.get('/:userId', (req, res, next) => {
  console.log(req.params.userId)
  Order.findAll({
    where: {
      userId: req.params.userId,
      status: {
        $ne: 'pending'
      }
    },
    raw: true
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

router.get('')


module.exports = router;

