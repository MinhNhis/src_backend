const { Sequelize, DataTypes } = require("sequelize");
const db = require("./Database.js");

const CacDichVu = db.define("cacdichvus", {
    id_cacdichvu : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tuy_chon_dv: {
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
  tableName: 'cacdichvus',
});

module.exports = CacDichVu;
