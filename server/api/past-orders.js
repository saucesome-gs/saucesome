const router = require('express').Router();
const { OrderItems, Order } = require('../db/models');

router.get('/:userId', (req, res, next) => {
  Order.findAll({
    // type: sequelize.QueryTypes.
    where: {
      userId: req.params.userId,
      status: {
        $ne: 'pending'
      }
    },
    // returning: true,
    // plain: true,
    raw: true
  })
  // .spread((results, metadata) =>  {
  //   res.status(200).send(results.data);
  // })
  .then((foundOrders) => {
    res.json(foundOrders);
  })
})


module.exports = router;

