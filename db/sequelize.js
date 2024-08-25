const { Sequelize, DataTypes } = require("sequelize");
const logger = require("debug")("SERVER:sequelize");
const dbConfig = require("../config").db;

const sequelize = new Sequelize(
  dbConfig.name,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    define: {
      timestamps: false,
    },
    logging: (msg) => logger(msg),
  }
);

module.exports = sequelize;
