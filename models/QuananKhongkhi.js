const { DataTypes } = require('sequelize');
const sequelize = require('./Database');

const QuananKhongkhi = sequelize.define('quanan_khongkhis', {
  id_quanan: {
    type: DataTypes.INTEGER,
    references: {
      model: 'quanans',
      key: 'id_quanan',
    },
  },
  id_khongkhi: {
    type: DataTypes.INTEGER,
    references: {
      model: 'khongkhis',
      key: 'id_khongkhi',
    },
  },
}, {
  timestamps: false,
  tableName: 'quanan_khongkhis',
});

module.exports = QuananKhongkhi;
