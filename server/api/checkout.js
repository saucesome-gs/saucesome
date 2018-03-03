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

router.put('/:orderId', (req, res, next) => {
  Order.update({
    status: 'purchased'
  }, {
    where: {id: req.params.orderId},
  })
  .then(updatedOrder => {
    console.log(updatedOrder);
    res.sendStatus(200)
  })
  .catch(next)
})

module.exports = router;

