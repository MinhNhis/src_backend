const { DataTypes } = require('sequelize');
const sequelize = require('./Database');

const QuananKehoach = sequelize.define('quanan_kehoachs', {
  id_quanan: {
    type: DataTypes.INTEGER,
    references: {
      model: 'quanans',
      key: 'id_quanan',
    },
  },
  id_kehoach: {
    type: DataTypes.INTEGER,
    references: {
      model: 'kehoachs',
      key: 'id_kehoach',
    },
  },
}, {
  timestamps: false,
  tableName: 'quanan_kehoachs',
});

module.exports = QuananKehoach;
