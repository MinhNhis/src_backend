const { QuananBaidoxe } = require("../../models");
const BaiDoXe = require("../../models/Baidoxe");

exports.paginator = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: baidoxes } = await BaiDoXe.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: baidoxes,
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

exports.getBaiDoXe = async (req, res, next) => {
  try {
    const baidoxes = await BaiDoXe.findAll({
      attributes: ["id_baidoxe", "bai_do_xe", "created_user", "updated_user"],
      order: [["id_baidoxe", "DESC"]]
    });
    res.status(200).json({
      message: "Danh sách bãi đỗ xe",
      data: baidoxes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.getBaidoxeById = async (req, res, next) => {
  try {
    let id = req.params.id_baidoxe;
    const baidoxe = await BaiDoXe.findByPk(id);
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: baidoxe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.createBaiDoXe = async (req, res, next) => {
  try {
    const baidoxes = await BaiDoXe.create({
      id_baidoxe: req.body.id_baidoxe,
      bai_do_xe: req.body.bai_do_xe,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,
    });
    res.status(201).json({
      messages: "Thêm thành công !",
      data: baidoxes.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.putBaidoxe = async (req, res) => {
  try {
    const id_baidoxe = parseInt(req.params.id_baidoxe);
    console.log(id_baidoxe);
    if (isNaN(id_baidoxe)) {
      return res.status(404).json({
        message: "Không tìm thấy!",
        data: [],
      });
    }

    const values = {
      bai_do_xe: req.body.bai_do_xe,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,
    };

    const baidoxe = await BaiDoXe.update(values, {
      where: {
        id_baidoxe: id_baidoxe,
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

exports.deleteBaidoxe = async (req, res, next) => {
  try {
    let id_baidoxe = req.params.id_baidoxe;
    await QuananBaidoxe.destroy({
      where: { id_baidoxe: id_baidoxe }
    })
    const baidoxe = await BaiDoXe.destroy({
      where: {
        id_baidoxe: id_baidoxe,
      },
    });
    res.status(200).json({
      messages: "Xóa thành công !",
      data: baidoxe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};
