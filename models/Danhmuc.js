
const sequelize = require('./Database');

const { Sequelize , DataTypes } = require('sequelize');

const Danhmuc  = sequelize.define('danhmucs', {
  id_danhmuc : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  danh_muc : Sequelize.STRING,
  created_user: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  updated_user: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  id_alldanhmuc: Sequelize.INTEGER
}, {
  timestamps: false
});



module.exports = Danhmuc;

