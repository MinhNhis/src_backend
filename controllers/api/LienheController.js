const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
exports.Lienhe = async (req, res) => {
    try {
        const { reason, sdt, email, ten } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'minhnhidmn0502@gmail.com',
                pass: 'wpglckyqsavqgaws'
            }
        });

        const mailOptions = {
            from: 'minhnhidmn0502@gmail.com',
            to: 'foodseekerdatn@gmail.com',
            subject: 'Thông tin liên hệ ',
            text: `Tài khoản người liên hệ: ${ten}`,
            html: `
              <div style="font-family: Arial, sans-serif; color: #333;">
                <h3>Chi tiết: Phản hồi liên hệ từ khách hàng</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                  <tr style="background-color: #f2f2f2;">
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Tên người dùng</th>
                    <td style="padding: 10px; border: 1px solid #ddd;">${ten}</td>
                  </tr>
                  <tr>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Email</th>
                    <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
                  </tr>
                  <tr>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Điện thoại</th>
                    <td style="padding: 10px; border: 1px solid #ddd;">${sdt}</td>
                  </tr>
                  <tr>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Nội dung</th>
                    <td style="padding: 10px; border: 1px solid #ddd;">${reason}</td>
                  </tr>
                </table>      
                <p style="font-size: 16px;">Trân trọng,<br /><strong>FoodSeeker</strong></p>
                <div style="background-color: #f9f9f9; padding: 10px; margin-top: 20px; text-align: center;">
                  <p style="font-size: 12px; color: #999;">Email này được gửi tự động. Vui lòng không trả lời email này.</p>
                </div>
              </div>
              `
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            message: "Gửi thành công",
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
}