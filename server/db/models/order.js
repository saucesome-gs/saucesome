const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('pending', 'purchased', 'shipped'),
    defaultValue: 'pending'
  }
})

module.exports = Order;
