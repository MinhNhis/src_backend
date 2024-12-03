const sequelize = require('./Database');
const { Sequelize , DataTypes } = require('sequelize');

const Khongkhi = sequelize.define("khongkhis", {
  id_khongkhi: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  khong_khi: {
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

module.exports = Khongkhi;