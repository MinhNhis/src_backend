const sequelize = require('./Database');

const { Sequelize , DataTypes } = require('sequelize');

const AllDanhmuc  = sequelize.define('tcdanhmuc', {
  id_alldanhmuc : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  created_user: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  updated_user: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  ten_danhmuc : Sequelize.STRING,
}, {
  timestamps: false
});



module.exports = AllDanhmuc;

