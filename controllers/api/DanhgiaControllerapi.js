const Danhgia = require('../../models/Danhgia');

exports.paginator = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: danhGia } = await Danhgia.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: danhGia,
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

exports.getDanhGiaById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const danhGia = await Danhgia.findByPk(id);
      
      if (!danhGia) {
        return res.status(404).json({ error: 'Đánh giá không tồn tại' });
      }
  
      res.status(200).json({
        data: danhGia,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Lỗi khi lấy đánh giá' });
    }
}

exports.getDanhgia = async (req, res) => {
  try {
    const Danhgias = await Danhgia.findAll({
      order: [["id_danhgia", "DESC"]]
    });
    res.status(200).json({
      message: "Danh sách đánh giá",
      data: Danhgias,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.createDanhgia = async (req, res) => {
    const { sao, binh_luan, danh_gia_do_an, danh_gia_dich_vu, 
    danh_gia_khong_khi, id_quanan, id_nguoidung } = req.body;
    const hinh_anh = req.file.filename

  try {
    const Danhgias = await Danhgia.create({
        sao,
        binh_luan,
        danh_gia_do_an,
        danh_gia_dich_vu,
        danh_gia_khong_khi,
        hinh_anh,
        id_quanan,
        id_nguoidung
    });
    res.status(201).json({
      message: "Thêm đánh giá thành công",
      data: Danhgias,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.updateDanhgia = async (req, res) => {
  try {
    const { id } = req.params;
    const { sao, binh_luan, danh_gia_do_an, danh_gia_dich_vu, danh_gia_khong_khi, id_quanan, id_nguoidung } = req.body;
    const hinh_anh = req.file.filename
    const updatedDanhgia = await Danhgia.update(
      { sao,
        binh_luan,
        danh_gia_do_an,
        danh_gia_dich_vu,
        danh_gia_khong_khi,
        hinh_anh,
        id_quanan,
        id_nguoidung },
      { where: { id_danhgia: id } }
    );

    if (updatedDanhgia[0] === 0) {
      return res.status(404).json({
        message: "Không tìm thấy đánh giá",
      });
    }

    res.status(200).json({
      message: "Cập nhật đánh giá thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.deleteDanhgia = async (req, res) => {
  try {
    const id_Danhgia = req.params.id;
    const deletedDanhgia = await Danhgia.destroy({
      where: { id_danhgia: id_Danhgia }
    });

    if (deletedDanhgia === 0) {
      return res.status(404).json({
        message: "Không tìm thấy đánh giá",
      });
    }

    res.status(200).json({
      message: "Xóa đánh giá thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};
