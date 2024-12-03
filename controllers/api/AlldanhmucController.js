const AllDanhmuc = require('../../models/Alldanhmuc');

exports.findAll = async (req, res, next) => {
  try {
    const alldanhmuc = await AllDanhmuc.findAll({
      order: [["id_alldanhmuc", "DESC"]]
    });
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: alldanhmuc,
    });
  } catch (error) {
    res.status(500).json({
      status: "False",
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.getAllDanhmucById = async (req, res, next) => {
  try {
    let id = req.params.id_alldanhmuc;
    const alldanhmuc = await AllDanhmuc.findByPk(id);
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: alldanhmuc,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.createAllDanhmuc = async (req, res, next) => {
  try {
    const { ten_danhmuc, created_user, updated_user } = req.body;

    const ListAlldanhmuc = {
      ten_danhmuc,
      created_user,
      updated_user,
    };
    const alldanhmuc = await AllDanhmuc.create(ListAlldanhmuc);
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: alldanhmuc.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.updateAllDanhmuc = async (req, res, next) => {
  try {
    const id = req.params.id_alldanhmuc;
    if (isNaN(id)) {
      return res.status(404).json({
        message: "Invalid id",
        data: [],
      });
    }
    const updatedAllDanhmuc = {
      ten_danhmuc: req.body.ten_danhmuc,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,
    };
    const alldanhmuc = await AllDanhmuc.update(updatedAllDanhmuc, {
      where: {
        id_alldanhmuc: id,
      },
    });
    res.status(201).json({
      messages: "Cập nhật Alldanhmuc thành công !",
      data: updatedAllDanhmuc,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.deleteAllDanhmuc = async (req, res, next) => {
  try {
    const id = req.params.id_alldanhmuc;

    const alldanhmuc = await AllDanhmuc.destroy({
      where: {
        id_alldanhmuc: id,
      },
    });

    res.status(200).json({
      messages: "danh muc đã được xóa thành công!",
      deldanhmuc: alldanhmuc,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};