const { Sequelize, DataTypes } = require("sequelize");
const db = require("../models/Database.js");

const Quanan = db.define("quanans", {
  id_quanan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ten_quan_an: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dia_chi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lng: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dien_thoai: {
    type: DataTypes.STRING,
  },
  gio_mo_cua: {
    type: DataTypes.TIME,
  },
  gio_dong_cua: {
    type: DataTypes.TIME,
  },
  link_website: {
    type: DataTypes.STRING,
  },
  link_facebook: {
    type: DataTypes.STRING,
  },
  hinh_anh: {
    type: DataTypes.STRING,
  },
  so_luong_cho: {
    type: DataTypes.INTEGER,
  },
  mo_ta: {
    type: DataTypes.STRING,
  },
  is_delete: {
    type: DataTypes.INTEGER,
  },
  created_user: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  updated_user: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
},
  {
    timestamps: false,
    tableName: "Quanans",
  }
);

module.exports = Quanan;