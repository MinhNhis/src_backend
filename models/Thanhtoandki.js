
const sequelize = require('./Database');
const { Sequelize , DataTypes } = require('sequelize');

const Thanhtoandki = sequelize.define('thanhtoandkis', {
    id_thanhtoan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ma_don : Sequelize.STRING,
  tong_tien : Sequelize.INTEGER,
  noi_dung : Sequelize.STRING,
  trang_thai : Sequelize.INTEGER,
  thoi_gian : Sequelize.STRING,
  ma_giao_dich : Sequelize.INTEGER,
  id_nguoidung: Sequelize.INTEGER
}, {
  timestamps: false
});

module.exports = Thanhtoandki;

