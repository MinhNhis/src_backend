const { Sequelize, DataTypes } = require("sequelize");
const db = require("./Database.js");

const NguoiDung = db.define("nguoidungs", {
  id_nguoidung: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ten_nguoi_dung: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mat_khau: {
    type: DataTypes.STRING, // Nếu là mật khẩu, nên dùng STRING thay vì INTEGER
    allowNull: true, // Để null vì không yêu cầu mật khẩu cho Google login
  },
  googleId: {
    type: DataTypes.STRING, // Thêm cột googleId để lưu ID từ Google
    allowNull: true, // Có thể null nếu đăng ký không qua Google
  },
  vai_tro: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dia_chi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stk: {
    type: DataTypes.STRING,
  },
  ngan_hang: {
    type: DataTypes.STRING,
  },
  ctk: {
    type: DataTypes.STRING,
  },
  hinh_QR: {
    type: DataTypes.STRING,
  },
  gioi_tinh: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  so_dien_thoai: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ngay_sinh: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hinh_anh: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'nguoidungs',
});

module.exports = NguoiDung;
