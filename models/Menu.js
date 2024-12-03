
const sequelize = require('./Database');

const { Sequelize , DataTypes } = require('sequelize');

const Menus = sequelize.define('menus', {
  id_menu: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ten_menu : Sequelize.STRING,
  gia : Sequelize.INTEGER,
  hinh_anh: Sequelize.STRING,
  id_danhmuc: Sequelize.INTEGER,
  id_quanan: Sequelize.INTEGER,
  created_user: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  updated_user: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: false
});



module.exports = Menus;

