const { Sequelize, DataTypes } = require("sequelize");
const db = require("./Database.js");

const Dichvu = db.define("dichvus", {
    id_dichvu: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dich_vu: Sequelize.STRING,
    created_user: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    updated_user: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Dichvu;
