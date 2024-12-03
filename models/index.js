// models/index.js
const sequelize = require('./Database');
const Quanan = require('./Quanan');
const Tiennghi = require('./Tiennghi');
const Dichvu = require('./Dichvu');
const Kehoach = require('./Kehoach');
const Khongkhi = require('./Khongkhi');
const LoaiKH = require('./LoaiKH');
const Baidoxe = require('./Baidoxe');
const QuananTiennghi = require('./QuananTiennghi');
const QuananDichvu = require('./QuananDichvu');
const QuananBaidoxe = require('./QuananBaidoxe');
const QuananKehoach = require('./QuananKehoach');
const QuananLoaikh = require('./QuananLoaikh');
const QuananKhongkhi = require('./QuananKhongkhi');

Quanan.belongsToMany(Tiennghi, { through: QuananTiennghi, foreignKey: 'id_quanan' });
Quanan.belongsToMany(Dichvu, { through: QuananDichvu, foreignKey: 'id_quanan' });
Quanan.belongsToMany(Kehoach, { through: QuananKehoach, foreignKey: 'id_quanan' });
Quanan.belongsToMany(Khongkhi, { through: QuananKhongkhi, foreignKey: 'id_quanan' });
Quanan.belongsToMany(LoaiKH, { through: QuananLoaikh, foreignKey: 'id_quanan' });
Quanan.belongsToMany(Baidoxe, { through: QuananBaidoxe, foreignKey: 'id_quanan' });

Tiennghi.belongsToMany(Quanan, { through: QuananTiennghi, foreignKey: 'id_tiennghi' });
Dichvu.belongsToMany(Quanan, { through: QuananDichvu, foreignKey: 'id_dichvu' });
Kehoach.belongsToMany(Quanan, { through: QuananKehoach, foreignKey: 'id_kehoach' });
Khongkhi.belongsToMany(Quanan, { through: QuananKhongkhi, foreignKey: 'id_khongkhi' });
LoaiKH.belongsToMany(Quanan, { through: QuananLoaikh, foreignKey: 'id_loaikh' });
Baidoxe.belongsToMany(Quanan, { through: QuananBaidoxe, foreignKey: 'id_baidoxe' });

module.exports = { sequelize, Quanan, Tiennghi, Dichvu, Kehoach, Khongkhi, LoaiKH, Baidoxe, QuananTiennghi, QuananDichvu, QuananBaidoxe, QuananKehoach, QuananLoaikh, QuananKhongkhi };
