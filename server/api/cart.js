const router = require('express').Router();
const { OrderItem } = require('../db/models');

async function withCart(req, res, next) {
  if (req.cart) return next()
  if (req.session.cartId) {
    // Go get that cart, put it on req.
    req = await Order.findById(req.session.cartId)
    return next()
  }
  // Otherwise, create one...
  if (!req.user) {
    // Create it for a not-logged-in-user
    return
  }
  // See if req.user has an active cart
  //  Order.findOne({user: req.user, state: 'CART'})

  // Otherwise, create a cart for this user.

  // What if there *is* a req.session.cartId, AND a user is logged in,
  // AND that user doesn't own the cart?
}

router.get('/:orderId', withCart, (req, res, next) => {
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

// commented
