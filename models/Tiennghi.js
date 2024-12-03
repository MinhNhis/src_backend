const sequelize = require('./Database');
const { Sequelize , DataTypes } = require('sequelize');

const Tiennghi = sequelize.define("tiennghis", {
  id_tiennghi: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tien_nghi: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  created_user: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  updated_user: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: false,
});

module.exports = Tiennghi;
