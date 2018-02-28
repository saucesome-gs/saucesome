const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  // Maybe eventually?
  //
  // status: ENUM('...')
})

module.exports = Order;
