const sequelize = require('./Database');
const { Sequelize , DataTypes } = require('sequelize');

const BaiDoXe = sequelize.define("baidoxes", {
  id_baidoxe: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bai_do_xe: {
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

module.exports = BaiDoXe;
