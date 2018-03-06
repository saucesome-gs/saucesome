const Sequelize = require('sequelize');
const db = require('../db');

const Price = db.define('price', {
  price: {
    type: Sequelize.FLOAT
  }
})

module.exports = Price;
