const { Sequelize } = require("sequelize");
const nodemailer = require("nodemailer");
const emailService = require("../../models/Email")


const Nguoidung = require("../../models/NguoiDung");
const { Quanan, Tiennghi, Dichvu, Kehoach, Khongkhi, Baidoxe, LoaiKH, sequelize } = require("../../models");

exports.paginator = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: quanan } = await Quanan.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["id_quanan", "DESC"]],
      include: [
        {
          model: Tiennghi,
          as: 'tiennghis',
        },
        {
          model: Dichvu,
          as: 'dichvus',
        },
        {
          model: Kehoach,
          as: 'kehoachs',
        },
        {
          model: Khongkhi,
          as: 'khongkhis',
        },
        {
          model: Baidoxe,
          as: 'baidoxes',
        },
        {
          model: LoaiKH,
          as: 'loaikhs',
        },
      ],
      distinct: true,
    });

    const totalPages = Math.ceil(count / limit);
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: quanan,
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

exports.getQuananById = async (req, res) => {
  const { id } = req.params;

  try {
    const quanan = await Quanan.findByPk(id, {
      include: [
        {
          model: Tiennghi,
          through: { attributes: [] },
        },
        {
          model: Dichvu,
          through: { attributes: [] },
        },
        {
          model: Kehoach,
          through: { attributes: [] },
        },
        {
          model: Khongkhi,
          through: { attributes: [] },
        },
        {
          model: Baidoxe,
          through: { attributes: [] },
        },
        {
          model: LoaiKH,
          through: { attributes: [] },
        },
      ],
      order: [["id_quanan", "DESC"]]
    });

    if (!Quanan) {
      return res.status(404).json({ error: "Quán ăn không tồn tại" });
    }

    res.status(200).json({
      data: quanan,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Lỗi khi lấy quán ăn" });
  }
};

exports.getQuanan = async (req, res) => {
  try {
    const quanan = await Quanan.findAll({
      include: [
        {
          model: Tiennghi,
          through: { attributes: [] },
        },
        {
          model: Dichvu,
          through: { attributes: [] },
        },
        {
          model: Kehoach,
          through: { attributes: [] },
        },
        {
          model: Khongkhi,
          through: { attributes: [] },
        },
        {
          model: Baidoxe,
          through: { attributes: [] },
        },
        {
          model: LoaiKH,
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json({
      message: "Danh sách quán ăn",
      data: quanan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.createQuanan = async (req, res) => {
  const {
    ten_quan_an,
    dia_chi,
    lat,
    lng,
    dien_thoai,
    gio_mo_cua,
    gio_dong_cua,
    link_website,
    link_facebook,
    so_luong_cho,
    mo_ta,
    created_user,
    updated_user,
    tiennghiIds,
    dichvuIds,
    kehoachIds,
    baidoxeIds,
    loaikhIds,
    khongkhiIds,
    is_delete
  } = req.body;
  const hinh_anh = req.file ? req.file.filename : null;
  const t = await sequelize.transaction();

  try {
    const Quanans = await Quanan.create(
      {
        ten_quan_an, dia_chi, lat, lng, dien_thoai, gio_mo_cua, gio_dong_cua, link_website, link_facebook, hinh_anh, so_luong_cho, mo_ta, created_user, updated_user, is_delete
      },
      { transaction: t }
    );

    if (tiennghiIds && tiennghiIds.length > 0) {
      await Quanans.setTiennghis(tiennghiIds, { transaction: t });
    }
    if (dichvuIds && dichvuIds.length > 0) {
      await Quanans.setDichvus(dichvuIds, { transaction: t });
    }
    if (kehoachIds && kehoachIds.length > 0) {
      await Quanans.setKehoachs(kehoachIds, { transaction: t });
    }
    if (baidoxeIds && baidoxeIds.length > 0) {
      await Quanans.setBaidoxes(baidoxeIds, { transaction: t });
    }
    if (loaikhIds && loaikhIds.length > 0) {
      await Quanans.setLoaikhs(loaikhIds, { transaction: t });
    }
    if (khongkhiIds && khongkhiIds.length > 0) {
      await Quanans.setKhongkhis(khongkhiIds, { transaction: t });
    }
    await t.commit();

    res.status(201).json({
      message: "Thêm quán ăn thành công",
      data: Quanans,
    });
  } catch (error) {
    await t.rollback();

    console.error("Error in createQuanan:", error);
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.updateQuanan = async (req, res) => {
  try {
    const { id } = req.params;
    const currentQuan = await Quanan.findOne({ where: { id_quanan: id } });

    if (!currentQuan) {
      return res.status(404).json({
        message: "Không tìm thấy quán ăn",
      });
    }

    const {
      ten_quan_an,
      dia_chi,
      lat,
      lng,
      dien_thoai,
      gio_mo_cua,
      gio_dong_cua,
      link_website,
      link_facebook,
      so_luong_cho,
      mo_ta,
      is_delete,
      created_user,
      updated_user,
      tiennghiIds,
      dichvuIds,
      kehoachIds,
      baidoxeIds,
      loaikhIds,
      khongkhiIds,
    } = req.body;

    const hinh_anh = req.file ? req.file.filename : currentQuan.hinh_anh;
    await Quanan.update(
      {
        ten_quan_an,
        dia_chi,
        lat,
        lng,
        dien_thoai,
        gio_mo_cua,
        gio_dong_cua,
        link_website,
        link_facebook,
        hinh_anh,
        so_luong_cho,
        mo_ta,
        is_delete,
        created_user,
        updated_user,
      },
      { where: { id_quanan: id } }
    );

    const tiennghiidsArray = Array.isArray(tiennghiIds) ? tiennghiIds : [];
    await currentQuan.setTiennghis(tiennghiidsArray);

    const dichvuidsArray = Array.isArray(dichvuIds) ? dichvuIds : [];
    await currentQuan.setDichvus(dichvuidsArray);

    const kehoachidsArray = Array.isArray(kehoachIds) ? kehoachIds : [];
    await currentQuan.setKehoachs(kehoachidsArray);

    const baidoxeidsArray = Array.isArray(baidoxeIds) ? baidoxeIds : [];
    await currentQuan.setBaidoxes(baidoxeidsArray);

    const loaikhidsArray = Array.isArray(loaikhIds) ? loaikhIds : [];
    await currentQuan.setLoaikhs(loaikhidsArray);

    const khongkhiidsArray = Array.isArray(khongkhiIds) ? khongkhiIds : [];
    await currentQuan.setKhongkhis(khongkhiidsArray);


    res.status(200).json({
      message: "Cập nhật quán ăn thành công",
      data: currentQuan,
    });


  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.isDelete = async (req, res) => {
  try {
    const t = await sequelize.transaction();
    const id_Quanan = req.params.id;
    const id_nguoidung = req.body.id_nguoidung;
    const reason = req.body.reason;
    const role = req.body.role;
    const {
      is_delete
    } = req.body;
    const nguoidung = await Nguoidung.findByPk(id_nguoidung);
    if (!nguoidung) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
      });
    }
    const quanan = await Quanan.findByPk(id_Quanan, { transaction: t });
    if (!quanan) {
      await t.rollback();
      return res.status(404).json({
        message: "Không tìm thấy quán ăn",
      });
    }
    await Quanan.update(
      {
        is_delete
      },
      { where: { id_quanan: id_Quanan } }
    );

    if (role === 0) {
      const HTMLContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <p>Xin chào ${nguoidung.ten_nguoi_dung},</p>
          <p>${quanan.is_delete === 0 ? `Quán ăn của bạn đã bị xóa khỏi hệ thống vì lý do: <strong>` : `Thông báo: <strong>`}${reason}</strong>.</p>

          <h3>Chi tiết:</h3>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Tên quán</th>
              <td style="padding: 10px; border: 1px solid #ddd;">${quanan.ten_quan_an}</td>
            </tr>
            <tr>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Chủ quán</th>
              <td style="padding: 10px; border: 1px solid #ddd;">${nguoidung.ten_nguoi_dung}</td>
            </tr>
            <tr>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Địa chỉ</th>
              <td style="padding: 10px; border: 1px solid #ddd;">${quanan.dia_chi}</td>
            </tr>
          </table>
          <p style="font-size: 16px; margin-top: 20px;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.</p>

          <p style="font-size: 16px;">Trân trọng,<br /><strong>FoodSeeker</strong></p>

          <div style="background-color: #f9f9f9; padding: 10px; margin-top: 20px; text-align: center;">
            <p style="font-size: 12px; color: #999;">Email này được gửi tự động. Vui lòng không trả lời email này.</p>
          </div>
        </div>
    `

      await emailService.sendEmail(nguoidung.email, quanan.is_delete === 0 ? `Quán ăn của bạn đã bị xóa` : `Quán ăn đã được khôi phục`, HTMLContent);
    }
    res.status(200).json({
      message: "Xóa quán ăn thành công và đã gửi email thông báo nếu là admin",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

}


const { Op } = require("sequelize");

exports.searchQuanan = async (req, res) => {
  const { keyword } = req.query;

  try {
    const quanan = await Quanan.findAll({
      where: {
        ten_quan_an: {
          [Op.like]: Sequelize.literal(`'%${keyword}%'`),
        },
      },
    });

    res.status(200).json({
      message: "Kết quả tìm kiếm",
      data: quanan.length > 0 ? quanan : [],
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.deleteQuanan = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const id_nguoidung = req.body.id_nguoidung;
    const reason = req.body.reason;
    const id_Quanan = req.params.id;
    const role = req.body.role;

    const nguoidung = await Nguoidung.findByPk(id_nguoidung);
    if (!nguoidung) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
      });
    }

    const quanan = await Quanan.findByPk(id_Quanan, { transaction: t });
    if (!quanan) {
      await t.rollback();
      return res.status(404).json({
        message: "Không tìm thấy quán ăn",
      });
    }
    await quanan.setTiennghis([], { transaction: t });
    await quanan.setDichvus([], { transaction: t });
    await quanan.setKehoachs([], { transaction: t });
    await quanan.setBaidoxes([], { transaction: t });
    await quanan.setKhongkhis([], { transaction: t });
    await quanan.setLoaikhs([], { transaction: t });
    await Quanan.destroy({
      where: { id_quanan: id_Quanan },
      transaction: t,
    });

    if (role === 0) {
      const HTMLContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <p>Xin chào ${nguoidung.ten_nguoi_dung},</p>
        <p>Quán ăn của bạn đã bị xóa khỏi hệ thống vì lý do: <strong>${reason}</strong>.</p>

        <h3>Chi tiết:</h3>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Tên quán</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${quanan.ten_quan_an}</td>
          </tr>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Chủ quán</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${nguoidung.ten_nguoi_dung}</td>
          </tr>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Địa chỉ</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${quanan.dia_chi}</td>
          </tr>
        </table>
        <p style="font-size: 16px; margin-top: 20px;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.</p>

        <p style="font-size: 16px;">Trân trọng,<br /><strong>FoodSeeker</strong></p>

      <div style="background-color: #f9f9f9; padding: 10px; margin-top: 20px; text-align: center;">
        <p style="font-size: 12px; color: #999;">Email này được gửi tự động. Vui lòng không trả lời email này.</p>
      </div>
      </div>
    `

      await emailService.sendEmail(nguoidung.email, `Quán ăn của bạn đã bị xóa`, HTMLContent);
    }

    await t.commit();

    res.status(200).json({
      message: "Xóa quán ăn thành công và đã gửi email thông báo nếu là admin",
    });
  } catch (error) {
    await t.rollback();
    console.error("Lỗi khi xóa quán ăn:", error);
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};
