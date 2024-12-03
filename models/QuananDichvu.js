const { DataTypes } = require('sequelize');
const sequelize = require('./Database');

const QuananDichvu = sequelize.define('quanan_dichvus', {
  id_quanan: {
    type: DataTypes.INTEGER,
    references: {
      model: 'quanans',
      key: 'id_quanan',
    },
  },
  id_dichvu: {
    type: DataTypes.INTEGER,
    references: {
      model: 'dichvus',
      key: 'id_dichvu',
    },
  },
}, {
  timestamps: false,
  tableName: 'quanan_dichvus',
});

module.exports = QuananDichvu;
