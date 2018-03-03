const router = require('express').Router();
const { Order, OrderItem } = require('../db/models');

router.post('/', (req, res, next) => {
  Order.create({
    status: 'purchased'
  })
  .then(createdOrder => {
    const orderId = createdOrder.dataValues.id;
    req.body.map(orderItem => {
      OrderItem.create({
        orderId,
        productId: orderItem.productId,
        priceId: orderItem.priceId
      })
    })
  })
  .then(() => res.status(201).send('ORDER RECEIVED AND ORDER ITEMS DB\'D') )
  .catch(next)
})

module.exports = router;

