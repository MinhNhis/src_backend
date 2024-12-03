const { Sequelize, DataTypes } = require("sequelize");
const db = require("../models/Database.js");

const Danhgia = db.define("danhgias", {
  id_danhgia: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  binh_luan: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  danh_gia_do_an: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  danh_gia_dich_vu: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  danh_gia_khong_khi: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hinh_anh: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  id_quanan: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_nguoidung: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
}, {
  timestamps: false,
  tableName: 'danhgias',
});

module.exports = Danhgia;