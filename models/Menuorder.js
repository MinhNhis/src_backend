const { Sequelize, DataTypes } = require("sequelize");
const db = require("./Database.js");

const Dichvu = db.define("menuorders", {
    id_menuorder: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ten_mon: Sequelize.STRING,
    so_luong: Sequelize.INTEGER,
    gia: Sequelize.INTEGER,
    id_datcho: Sequelize.INTEGER,
  },
  {
    timestamps: false,
  }
);

module.exports = Dichvu;
