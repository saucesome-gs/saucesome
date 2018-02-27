const router = require('express').Router();
const { OrderItem } = require('../db/models');

router.get('/:orderId', (req, res, next) => {
  OrderItem.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    where: {
      orderId: req.params.orderId
    }
  })
    .then(users => res.json(users))
    .catch(next)
})

module.exports = router;
