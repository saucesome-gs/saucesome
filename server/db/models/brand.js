const Sequelize = require('sequelize');
const db = require('../db');

const Brand = db.define('brand', {
  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.TEXT
  },
  coordinates: {
    type: Sequelize.ARRAY(Sequelize.DOUBLE)
  },
});

module.exports = Brand;
