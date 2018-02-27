const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  brand: {
    type: Sequelize.STRING,
    allowEmpty: false
  },
  name: {
    type: Sequelize.STRING,
    allowEmpty: false
  },
  description: {
    type: Sequelize.TEXT
  },
  ingredients: {
    type: Sequelize.TEXT
  },
  size: {
    type: Sequelize.STRING
  },
  spiciness: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
      max: 10
    }
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.TEXT,
    validate: {
      isUrl: true
    }
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

module.exports = Product;
