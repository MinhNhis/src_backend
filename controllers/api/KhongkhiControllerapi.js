const { QuananKhongkhi } = require("../../models");
const Khongkhi = require("../../models/Khongkhi");

exports.paginator = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: khong_khi } = await Khongkhi.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: khong_khi,
      pagination: {
        totalItems: count,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getKhongkhi = async (req, res, next) => {
  try {
    const khongkhis = await Khongkhi.findAll({
      attributes: ["id_khongkhi", "khong_khi", "created_user", "updated_user"],
      order: [["id_khongkhi", "DESC"]]
    });
    res.status(200).json({
      message: "Danh sách không khí",
      data: khongkhis,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.getKhongkhiById = async (req, res, next) => {
  try {
    let id = req.params.id_khongkhi;
    const khongkhi = await Khongkhi.findByPk(id);
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: khongkhi,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.createKhongkhi = async (req, res, next) => {
  try {
    const khongkhis = await Khongkhi.create({
      id_khongkhi: req.body.id_khongkhi,
      khong_khi: req.body.khong_khi,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,
    });
    res.status(201).json({
      messages: "Thêm thành công !",
      data: khongkhis.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.putKhongkhi = async (req, res) => {
  try {
    const id_khongkhi = parseInt(req.params.id_khongkhi);
    console.log(id_khongkhi);
    if (isNaN(id_khongkhi)) {
      return res.status(404).json({
        message: "Không tìm thấy!",
        data: [],
      });
    }

    const values = {
      khong_khi: req.body.khong_khi,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,
    };

    const khongkhi = await Khongkhi.update(values, {
      where: {
        id_khongkhi: id_khongkhi,
      },
    });

    res.status(200).json({
      message: "Cập nhật thành công!",
      data: values,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};
exports.deleteKhongkhi = async (req, res, next) => {
  try {
    let id_khongkhi = req.params.id_khongkhi;

    await QuananKhongkhi.destroy({
      where: { id_khongkhi: id_khongkhi },
    });

    const khongkhi = await Khongkhi.destroy({
      where: {
        id_khongkhi: id_khongkhi,
      },
    });

    if (khongkhi === 0) {
      return res.status(404).json({
        message: "Không tìm thấy không gian để xóa",
        data: [],
      });
    }
    res.status(200).json({
      messages: "Xóa thành công !",
      data: khongkhi,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};
