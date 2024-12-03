const LoaiKH = require('../../models/LoaiKH');

exports.paginator = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: loaikh } = await LoaiKH.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: loaikh,
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

exports.getLoaiKH = async (req, res, next) => {
  const loaikh = await LoaiKH.findAll({
      attributes: ['id_loaikh', 'khach_hang', 'created_user', 'updated_user']
  })
  res.status(200).json({
      messages: "Danh sách loại khách hàng",
      data: loaikh
  })
}

exports.getLoaiKHByID = async (req, res, next) => {
  let id_loaikh  = parseInt(req.params.id_loaikh)
  console.log(id_loaikh);
  if (isNaN(id_loaikh)) {
      return res.status(404).json({
          "message": "Invalid id_loaikh",
          "data": []
      })
  }

  const LoaiKHByID = await LoaiKH.findByPk(id_loaikh, {
    attributes: ['id_loaikh', 'khach_hang', 'created_user', 'updated_user'],
    order: [["id_loaikh", "DESC"]]
  })
  res.status(200).json({
      messages: "Loại khách hàng theo ID",
      data: LoaiKHByID
  })

}

exports.postLoaiKH= async (req, res, next) => {
  const obj = {
    khach_hang: req.body.khach_hang,
    created_user: req.body.created_user,
    updated_user: req.body.updated_user,
  };

  constsubject = await LoaiKH.create(obj)
  res.status(201).json({
      messages: "Thêm thành công !",
      data: obj
  })
}

exports.putLoaiKH = async (req, res) => {
  const id_loaikh = parseInt(req.params.id_loaikh);
  console.log(id_loaikh);
  if (isNaN(id_loaikh)) {
      return res.status(404).json({
          "message": "Invalid id_loaikh",
          "data": []
      })
  }
  const values = {
    khach_hang: req.body.khach_hang,
    created_user: req.body.created_user,
    updated_user: req.body.updated_user,
   
  }
  constsubject = await LoaiKH.update(values, {
      where: {
        id_loaikh: id_loaikh
      }
  })

  res.status(200).json({
      messages: 'Cập nhật thành công',
      data: values
  });
};

exports.deleteLoaiKH = async (req, res, next) => {
  let id_loaikh = req.params.id_loaikh

  const loaikh = await LoaiKH.destroy({
      where: {
        id_loaikh: id_loaikh
      }
  });
  res.status(200).json({
      messages: "Xóa thành công !",
      data: loaikh
  })
}
