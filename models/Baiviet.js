const sequelize = require('./Database');
const { Sequelize, DataTypes } = require('sequelize');

const BaiViet = sequelize.define("baiviets", {
    id_baiviet: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tieu_de: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    noi_dung: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hinh_anh: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ngay_dang: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    created_user: Sequelize.INTEGER
}, {
    timestamps: false,
});

module.exports = BaiViet;