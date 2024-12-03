const CacDichVu = require('../../models/CacDichVu');

exports.paginator = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: dv } = await CacDichVu.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: dv,
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

exports.getCacDichVu = async (req, res, next) => {
  const dv = await CacDichVu.findAll({
      attributes: ['id_cacdichvu', 'tuy_chon_dv', 'created_user', 'updated_user'],
      order: [["id_cacdichvu", "DESC"]]
  })
  res.status(200).json({
      messages: "Danh sách các dịch vụ",
      data: dv
  })
}

exports.getCacDichVuByID = async (req, res, next) => {
  let id_cacdichvu  = parseInt(req.params.id_cacdichvu)
  console.log(id_cacdichvu);
  if (isNaN(id_cacdichvu)) {
      return res.status(404).json({
          "message": "Invalid id_cacdichvu",
          "data": []
      })
  }

  const dv = await CacDichVu.findByPk(id_cacdichvu, {
    attributes: ['id_cacdichvu', 'tuy_chon_dv', 'created_user', 'updated_user']
  })
  res.status(200).json({
      messages: "Dịch vụ",
      data: dv
  })

}

exports.postCacDichVu= async (req, res, next) => {
  const obj = {
    tuy_chon_dv: req.body.tuy_chon_dv,
    created_user: req.body.created_user,
    updated_user: req.body.updated_user,
  };

  constsubject = await CacDichVu.create(obj)
  res.status(201).json({
      messages: "Thêm thành công !",
      data: obj
  })
}

exports.putCacDichVu = async (req, res) => {
  const id_cacdichvu = parseInt(req.params.id_cacdichvu);
  console.log(id_cacdichvu);
  if (isNaN(id_cacdichvu)) {
      return res.status(404).json({
          "message": "Invalid id_cacdichvu",
          "data": []
      })
  }
  const values = {
    tuy_chon_dv: req.body.tuy_chon_dv,
    created_user: req.body.created_user,
    updated_user: req.body.updated_user,
   
  }
  constsubject = await CacDichVu.update(values, {
      where: {
        id_cacdichvu: id_cacdichvu
      }
  })

  res.status(200).json({
      messages: 'Cập nhật thành công',
      data: values
  });
};

exports.deleteCacDichVu = async (req, res, next) => {
  let id_cacdichvu = req.params.id_cacdichvu

  const dv = await CacDichVu.destroy({
      where: {
        id_cacdichvu: id_cacdichvu
      }
  });
  res.status(200).json({
      messages: "Xóa thành công !",
      data: dv
  })
}
