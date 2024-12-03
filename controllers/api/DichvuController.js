const Dichvu = require("../../models/Dichvu");
const QuananDichvus = require("../../models/QuananDichvu")

exports.paginator = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: dichvu } = await Dichvu.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: dichvu,
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

exports.getDichvu = async (req, res, next) => {
  try {
    const dichvu = await Dichvu.findAll({
      attributes: ["id_dichvu", "dich_vu", "created_user", "updated_user"],
      order: [["id_dichvu", "DESC"]]
    });
    res.status(200).json({
      message: "Danh sách dịch vụ",
      data: dichvu
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.getDichvuById = async (req, res, next) => {
  try {
    let id_dichvu = parseInt(req.params.id_dichvu)
    console.log(id_dichvu);
    if (isNaN(id_dichvu)) {
      return res.status(404).json({
        "message": "Id không tồn tại",
        "data": []
      })
    }

    const dichvu = await Dichvu.findByPk(id_dichvu, {
      attributes: ["id_dichvu", "dich_vu", "created_user", "updated_user"]
    })
    res.status(200).json({
      messages: "Dịch vụ với id: " + id_dichvu,
      data: dichvu
    })
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

}

exports.postDichvu = async (req, res, next) => {
  try {
    const { dich_vu, created_user, updated_user } = req.body;
    const dichvu = await Dichvu.create({
      dich_vu,
      created_user,
      updated_user
    });

    res.status(201).json({
      message: 'Thêm dịch vụ thành công',
      data: dichvu.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.putDichvu = async (req, res) => {
  try {
    let id_dichvu = parseInt(req.params.id_dichvu)
    console.log(id_dichvu);
    if (isNaN(id_dichvu)) {
      return res.status(404).json({
        "message": "Id không tồn tại",
        "data": []
      })
    }
    const values = {
      dich_vu: req.body.dich_vu,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,
    }
    const dichvu = await Dichvu.update(values, {
      where: {
        id_dichvu: id_dichvu
      }
    })

    res.status(200).json({
      messages: 'Cập nhật thành công!',
      data: values
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.deleteDichvu = async (req, res, next) => {
  try {
    let id_dichvu = parseInt(req.params.id_dichvu);

    if (isNaN(id_dichvu)) {
      return res.status(404).json({
        message: "Id không tồn tại",
        data: [],
      });
    }
    await QuananDichvus.destroy({
      where: { id_dichvu: id_dichvu },
    });

    const dichvu = await Dichvu.destroy({
      where: { id_dichvu: id_dichvu },
    });

    if (dichvu === 0) {
      return res.status(404).json({
        message: "Không tìm thấy dịch vụ để xóa",
        data: [],
      });
    }

    res.status(200).json({
      message: "Xóa thành công!",
      data: dichvu,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};







