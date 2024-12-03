
const sequelize = require('./Database');

const { Sequelize , DataTypes } = require('sequelize');

const Datcho = sequelize.define('datchos', {
  id_datcho: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ma_don: Sequelize.STRING,
  tien_coc: Sequelize.INTEGER,
  ma_giao_dich: Sequelize.INTEGER,
  ten_quan : Sequelize.STRING,
  ten_kh : Sequelize.STRING,
  sdt_kh : Sequelize.STRING,
  email_kh : Sequelize.STRING,
  ngay_dat : Sequelize.STRING,
  thoi_gian : Sequelize.STRING,
  so_luong_nguoi : Sequelize.INTEGER,
  trang_thai : Sequelize.INTEGER,
  ly_do_huy : Sequelize.STRING,
  yeu_cau_khac : Sequelize.STRING,
  id_nguoidung : Sequelize.INTEGER,
  id_quanan : Sequelize.INTEGER,
  is_danhgia : Sequelize.INTEGER,
}, {
  timestamps: false
});



module.exports = Datcho;

