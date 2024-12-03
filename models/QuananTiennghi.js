const { DataTypes } = require('sequelize');
const sequelize = require('./Database');

const QuananTiennghi = sequelize.define('quanan_tiennghis', {
  id_quanan: {
    type: DataTypes.INTEGER,
    references: {
      model: 'quanans',
      key: 'id_quanan',
    },
  },
  id_tiennghi: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tiennghis',
      key: 'id_tiennghi',
    },
  },
}, {
  timestamps: false,
  tableName: 'quanan_tiennghis',
});

module.exports = QuananTiennghi;
