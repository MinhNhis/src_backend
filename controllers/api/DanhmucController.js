const Danhmuc = require("../../models/Danhmuc");

exports.paginator = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: danhmuc } = await Danhmuc.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: danhmuc,
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

exports.findAll = async (req, res, next) => {
  try {
    const danhmuc = await Danhmuc.findAll({
      order: [["id_danhmuc", "DESC"]]
    });
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: danhmuc,
    });
  } catch (error) {
    res.status(500).json({
      status: "False",
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.getDanhmucById = async (req, res, next) => {
  try {
    let id = req.params.id_danhmuc;
    const danhmuc = await Danhmuc.findByPk(id);
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: danhmuc,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.deleteDanhmuc = async (req, res, next) => {
  try {
    const id = req.params.id_danhmuc;

    const danhmuc = await Danhmuc.destroy({
      where: {
        id_danhmuc: id,
      },
    });

    res.status(200).json({
      messages: "danh muc đã được xóa thành công!",
      deldanhmuc: danhmuc,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.createDanhmuc = async (req, res, next) => {
  try {
    const { danh_muc, created_user, updated_user, id_alldanhmuc } = req.body;

    const listdanhmuc = {
      danh_muc,
      created_user,
      updated_user,
      id_alldanhmuc
    };
    const danhmuc = await Danhmuc.create(listdanhmuc);
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: danhmuc.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }

};

exports.updateDanhmuc = async (req, res, next) => {
  try {
    const id = req.params.id_danhmuc;
    if (isNaN(id)) {
      return res.status(404).json({
        message: "Invalid id",
        data: [],
      });
    }
    const updatedDanhmuc = {
      danh_muc: req.body.danh_muc,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,
    };
    const danhmuc = await Danhmuc.update(updatedDanhmuc, {
      where: {
        id_danhmuc: id,
      },
    });
    res.status(201).json({
      messages: "Cập nhật parent thành công !",
      data: updatedDanhmuc,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};