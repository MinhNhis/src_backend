const sequelize = require('./Database');
const { Sequelize , DataTypes } = require('sequelize');

const Kehoach = sequelize.define("kehoachs", {
  id_kehoach: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ke_hoach: {
    type: Sequelize.STRING,
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
}, {
  timestamps: false,
});

module.exports = Kehoach;
