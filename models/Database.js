const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('datn', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql'
  });
module.exports = sequelize;

