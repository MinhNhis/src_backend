const { QuananTiennghi } = require("../../models");
const Tiennghi = require("../../models/Tiennghi");

exports.paginator = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: tiennghis } = await Tiennghi.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: tiennghis,
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

exports.getTiennghi = async (req, res, next) => {
  try {
    const tiennghis = await Tiennghi.findAll({
      attributes: ["id_tiennghi", "tien_nghi", "created_user", "updated_user"],
      order: [["id_tiennghi", "DESC"]]
    });
    res.status(200).json({
      message: "Danh sách tiện nghi",
      data: tiennghis,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.getTiennghiById = async (req, res, next) => {
  try {
    let id = req.params.id_tiennghi;
    const tiennghi = await Tiennghi.findByPk(id);
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: tiennghi,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.createTiennghi = async (req, res, next) => {
  try {
    const tiennghis = await Tiennghi.create({
      id_tiennghi: req.body.id_tiennghi,
      tien_nghi: req.body.tien_nghi,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,
    });
    res.status(201).json({
      messages: "Thêm thành công !",
      data: tiennghis.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.putTiennghi = async (req, res) => {
  try {
    const id_tiennghi = parseInt(req.params.id_tiennghi);
    console.log(id_tiennghi);
    if (isNaN(id_tiennghi)) {
      return res.status(404).json({
        message: "Không tìm thấy!",
        data: [],
      });
    }

    const values = {
      tien_nghi: req.body.tien_nghi,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,
    };

    const tiennghi = await Tiennghi.update(values, {
      where: {
        id_tiennghi: id_tiennghi,
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
exports.deleteTiennghi = async (req, res, next) => {
  try {
    let id_tiennghi = req.params.id_tiennghi
    await QuananTiennghi.destroy({
      where: { id_tiennghi: id_tiennghi }
    })
    const tiennghi = await Tiennghi.destroy({
      where: {
        id_tiennghi: id_tiennghi
      }
    });
    res.status(200).json({
      messages: "Xóa thành công !",
      data: tiennghi
    })
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

}