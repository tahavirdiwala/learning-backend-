const { Sequelize } = require("sequelize");
const sequelize = require("../db/sequelize");

const Categories = require("../models/categories")(
  sequelize,
  Sequelize.DataTypes
);
const Products = require("../models/product")(sequelize, Sequelize.DataTypes);

Products.belongsTo(Categories, { foreignKey: "categoryId", as: "category" });
Categories.hasMany(Products, { foreignKey: "categoryId" });

module.exports = {
  Categories,
  Products,
};
