const NguoiDung = require('../../models/NguoiDung');
const emailService = require('../../models/Email')

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.paginator = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: nguoidungs } = await NguoiDung.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["id_nguoidung", "DESC"]]
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: nguoidungs,
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

exports.getNguoiDung = async (req, res, next) => {
  try {
    const nguoidungs = await NguoiDung.findAll({
      attributes: ['id_nguoidung', 'ten_nguoi_dung', 'email', 'mat_khau', 'vai_tro', 'dia_chi', 'so_dien_thoai', 'hinh_anh', 'ngay_sinh', 'gioi_tinh', 'stk', 'ngan_hang', 'ctk'],
      order: [["id_nguoidung", "DESC"]]
    })
    res.status(200).json({
      messages: "Danh sách tài khoản",
      data: nguoidungs
    })
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

}

exports.getNguoiDungByID = async (req, res, next) => {
  try {
    let id_nguoidung = parseInt(req.params.id_nguoidung)
    if (isNaN(id_nguoidung)) {
      return res.status(404).json({
        "message": "Invalid id_nguoidung",
        "data": []
      })
    }

    const NguoiDungByID = await NguoiDung.findByPk(id_nguoidung, {
      attributes: ['id_nguoidung', 'ten_nguoi_dung', 'email', 'mat_khau', 'vai_tro', 'dia_chi', 'so_dien_thoai', 'hinh_anh', 'ngay_sinh', 'gioi_tinh', 'stk', 'ngan_hang', 'ctk']
    })
    res.status(200).json({
      messages: "Người dùng theo ID",
      data: NguoiDungByID
    })
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
}

exports.postNguoiDung = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.mat_khau, saltRounds);

    const obj = {
      ten_nguoi_dung: req.body.ten_nguoi_dung,
      email: req.body.email,
      mat_khau: hashedPassword,
      vai_tro: req.body.vai_tro,
      dia_chi: req.body.dia_chi,
      so_dien_thoai: req.body.so_dien_thoai,
      stk: req.body.stk,
      ngan_hang: req.body.ngan_hang,
      ctk: req.body.ctk,
    };

    const checkEmail = await NguoiDung.findOne({ where: { email: obj.email } });
    if (checkEmail) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    const subject = await NguoiDung.create(obj)
    res.status(201).json({
      messages: "Thêm thành công !",
      data: obj
    })
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

}

exports.putNguoiDung = async (req, res) => {
  const id_nguoidung = parseInt(req.params.id_nguoidung);

  if (isNaN(id_nguoidung)) {
    return res.status(404).json({
      "message": "Invalid id_nguoidung",
      "data": []
    });
  }

  try {
    const existingUser = await NguoiDung.findByPk(id_nguoidung);

    if (!existingUser) {
      return res.status(404).json({
        message: 'Người dùng không tồn tại',
        data: []
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.mat_khau, saltRounds);

    const values = {
      ten_nguoi_dung: req.body.ten_nguoi_dung,
      email: req.body.email,
      // mat_khau: hashedPassword,
      vai_tro: req.body.vai_tro,
      dia_chi: req.body.dia_chi,
      so_dien_thoai: req.body.so_dien_thoai,
      ngay_sinh: req.body.ngay_sinh,
      gioi_tinh: req.body.gioi_tinh,
      stk: req.body.stk,
      ngan_hang: req.body.ngan_hang,
      ctk: req.body.ctk,
      hinh_anh: req.file ? req.file.filename : existingUser.hinh_anh,
    };

    await NguoiDung.update(values, {
      where: {
        id_nguoidung: id_nguoidung
      }
    });

    res.status(200).json({
      messages: 'Cập nhật thành công',
      data: values
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật người dùng:', error);
    res.status(500).json({
      message: 'Lỗi khi cập nhật người dùng',
      data: []
    });
  }
};

exports.deleteNguoiDung = async (req, res, next) => {
  let id_nguoidung = req.params.id_nguoidung;
  const { reason } = req.body;

  try {
    const nguoidung = await NguoiDung.findByPk(id_nguoidung);

    if (!nguoidung) {
      return res.status(404).json({
        messages: "Không tìm thấy người dùng",
        data: [],
      });
    }

    // Kiểm tra nếu người dùng có vai trò là Admin
    if (nguoidung.vai_tro === 0) {
      return res.status(400).json({
        message: "Không thể xóa người dùng có vai trò là Admin!",
      });
    }

    // Gửi email thông báo cho người dùng
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <p>Xin chào ${nguoidung.ten_nguoi_dung},</p>
          <p>Tài khoản của bạn đã bị xóa khỏi hệ thống vì lý do: <strong>${reason}</strong>.</p>

          <h3>Chi tiết:</h3>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Tên người dùng</th>
              <td style="padding: 10px; border: 1px solid #ddd;">${nguoidung.ten_nguoi_dung}</td>
            </tr>
            <tr>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Email</th>
              <td style="padding: 10px; border: 1px solid #ddd;">${nguoidung.email}</td>
            </tr>
            <tr>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Điện thoại</th>
              <td style="padding: 10px; border: 1px solid #ddd;">${nguoidung.so_dien_thoai}</td>
            </tr>
            <tr>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Địa chỉ</th>
              <td style="padding: 10px; border: 1px solid #ddd;">${nguoidung.dia_chi}</td>
            </tr>
          </table>
          <p style="font-size: 16px; margin-top: 20px;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.</p>

          <p style="font-size: 16px;">Trân trọng,<br /><strong>FoodSeeker</strong></p>

          <div style="background-color: #f9f9f9; padding: 10px; margin-top: 20px; text-align: center;">
            <p style="font-size: 12px; color: #999;">Email này được gửi tự động. Vui lòng không trả lời email này.</p>
          </div>
        </div>
        `

    await emailService.sendEmail(nguoidung.email, 'Tài khoản của bạn đã bị xóa', html);

    // Xóa người dùng
    await NguoiDung.destroy({
      where: {
        id_nguoidung: id_nguoidung,
      },
    });

    res.status(200).json({
      messages: "Xóa thành công !",
      data: {},
    });
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
    res.status(500).json({
      message: 'Có lỗi xảy ra khi xóa người dùng',
      data: [],
    });
  }
};

// API login
exports.login = async (req, res) => {
  const { email, mat_khau } = req.body;
  try {
    const nguoidung = await NguoiDung.findOne({ where: { email } });
  if (!nguoidung) {
    return res.status(401).json({ error: 'Tài khoản hoặc mật khẩu không chính xác!' });
  }

  const isMatch = await bcrypt.compare(mat_khau, nguoidung.mat_khau);
  if (!isMatch) {
    return res.status(401).json({ error: 'Tài khoản hoặc mật khẩu không chính xác!' });
  }

  res.status(200).json({
    message: 'Đăng nhập thành công',
    data: nguoidung
  });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};



exports.ChangePassword = async (req, res) => {
  let id_nguoidung = req.params.id_nguoidung
  const { mat_khau, newMat_khau } = req.body;

  try {
    const nguoidung = await NguoiDung.findOne({ where: { id_nguoidung: id_nguoidung } });

    if (!nguoidung) {
      return res.status(404).json({ error: 'Người dùng không tồn tại' });
    }
    const isMatch = await bcrypt.compare(mat_khau, nguoidung.mat_khau);
    if (!isMatch) {
      return res.status(401).json({ error: 'Mật khẩu hiện tại không chính xác' });
    }
    const hashedPassword = await bcrypt.hash(newMat_khau, 10);

    nguoidung.mat_khau = hashedPassword;
    await nguoidung.save();

    res.status(200).json({ message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    res.status(500).json({ error: 'Có lỗi xảy ra khi đổi mật khẩu' });
  }
};



exports.getProfile = async (req, res) => {
  const { id_nguoidung } = req.user;
  const profile = await NguoiDung.findByPk(id_nguoidung, {
    attributes: ['id_nguoidung', 'ten_nguoi_dung', 'email', 'mat_khau', 'vai_tro', 'dia_chi', 'so_dien_thoai', 'hinh_anh', 'ngay_sinh', 'gioi_tinh']
  });

  if (!profile) {
    return res.status(404).json({
      message: "Không tìm thấy người dùng",
      data: []
    });
  }

  res.status(200).json({
    message: "Thông tin người dùng",
    data: profile
  });
};

exports.sendResetEmail = async (email, tempPassword) => {
  try {
    await emailService.sendEmail(
      email,
      'Đổi mật khẩu',
      `Mật khẩu tạm thời của bạn là: ${tempPassword}\n Hãy sao chép mật khẩu này để đăng nhập và cập nhật mật khẩu mới .`
    );
  } catch (err) {
    console.error('Lỗi khi gửi mail:', err);
    throw new Error('Failed to send password reset email.');
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await NguoiDung.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Sai email hoặc email không tồn tại.' });
    }

    // Tạo mật khẩu tạm thời
    const tempPassword = crypto.randomBytes(6).toString('hex');
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

    // Cập nhật mật khẩu tạm thời cho người dùng
    user.mat_khau = hashedTempPassword;
    await user.save();

    // Gửi email reset password với mật khẩu tạm thời
    await this.sendResetEmail(user.email, tempPassword);

    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi gửi mail.' });
  }
};
