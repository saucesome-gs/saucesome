const User = require('./user');
const Product = require('./product');
const Price = require('./price');
const Order = require('./order');
const OrderItem = require('./order-item');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Product.hasMany(Price);
Order.belongsTo(User);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);
OrderItem.belongsTo(Price);


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Price,
  Order,
  OrderItem
}
