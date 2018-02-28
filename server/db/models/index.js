const User = require("./user");
const Product = require("./product");
const Brand = require("./brand");
const Price = require("./price");
const Order = require("./order");
const OrderItem = require("./order-item");
const Review = require("./review");

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Product.hasMany(Price);
Product.belongsTo(Brand);
Order.belongsTo(User);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);
OrderItem.belongsTo(Price);
Review.belongsTo(User);
Review.belongsTo(Product);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Brand,
  Price,
  Order,
  OrderItem,
  Review
};
