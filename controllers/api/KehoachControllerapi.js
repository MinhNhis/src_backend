const { QuananKehoach } = require("../../models");
const Kehoach = require("../../models/Kehoach");

exports.paginator = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: kehoach } = await Kehoach.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: kehoach,
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

exports.getKehoach = async (req, res, next) => {
  try {
    const kehoachs = await Kehoach.findAll({
      attributes: ["id_kehoach", "ke_hoach", "created_user", "updated_user"],
      order: [["id_kehoach", "DESC"]]
    });
    res.status(200).json({
      message: "Danh sách kế hoạch",
      data: kehoachs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.getKehoachById = async (req, res, next) => {
  try {
    let id = req.params.id_kehoach;
    const kehoach = await Kehoach.findByPk(id);
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: kehoach,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.createKehoach = async (req, res, next) => {
  try {
    const kehoachs = await Kehoach.create({
      id_kehoach: req.body.id_kehoach,
      ke_hoach: req.body.ke_hoach,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,
    });
    res.status(201).json({
      messages: "Thêm thành công !",
      data: kehoachs.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.putKehoach = async (req, res) => {
  try {
    const id_kehoach = parseInt(req.params.id_kehoach);
    console.log(id_kehoach);
    if (isNaN(id_kehoach)) {
      return res.status(404).json({
        message: "Không tìm thấy!",
        data: [],
      });
    }

    const values = {
      ke_hoach: req.body.ke_hoach,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,
    };

    const kehoach = await Kehoach.update(values, {
      where: {
        id_kehoach: id_kehoach,
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

exports.deleteKehoach = async (req, res, next) => {
  try {
    let id_kehoach = req.params.id_kehoach;

    await QuananKehoach.destroy({
      where: { id_kehoach: id_kehoach }
    })

    const kehoach = await Kehoach.destroy({
      where: {
        id_kehoach: id_kehoach,
      },
    });

    if (kehoach === 0) {
      return res.status(404).json({
        message: "Không tìm thấy kế hoạch để xóa",
        data: [],
      });
    }
    res.status(200).json({
      messages: "Xóa thành công !",
      data: kehoach,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};
