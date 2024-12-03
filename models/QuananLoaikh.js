const { DataTypes } = require('sequelize');
const sequelize = require('./Database');

const QuananLoaikh = sequelize.define('quanan_loaikhs', {
  id_quanan: {
    type: DataTypes.INTEGER,
    references: {
      model: 'quanans',
      key: 'id_quanan',
    },
  },
  id_loaikh: {
    type: DataTypes.INTEGER,
    references: {
      model: 'loaikh',
      key: 'id_loaikh',
    },
  },
}, {
  timestamps: false,
  tableName: 'quanan_loaikhs',
});

module.exports = QuananLoaikh;
