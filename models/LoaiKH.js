const { Sequelize, DataTypes } = require("sequelize");
const db = require("./Database.js");

const LoaiKH = db.define("loaikh", {
    id_loaikh: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  khach_hang: {
    type: DataTypes.STRING(50),
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
  tableName: 'loaikh',
});

module.exports = LoaiKH;
