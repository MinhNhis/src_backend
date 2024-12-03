const { DataTypes } = require('sequelize');
const sequelize = require('./Database');

const QuananBaidoxe = sequelize.define('quanan_baidoxes', {
  id_quanan: {
    type: DataTypes.INTEGER,
    references: {
      model: 'quanans',
      key: 'id_quanan',
    },
  },
  id_baidoxe: {
    type: DataTypes.INTEGER,
    references: {
      model: 'baidoxe',
      key: 'id_baidoxe',
    },
  },
}, {
  timestamps: false,
  tableName: 'quanan_baidoxes',
});

module.exports = QuananBaidoxe;
