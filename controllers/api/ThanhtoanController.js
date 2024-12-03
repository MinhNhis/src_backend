const axios = require('axios');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Thanhtoandki = require('../../models/Thanhtoandki')
const emailService = require('../../models/Email')

var accessKey = 'F8BBA842ECF85';
var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

exports.checkOut = async (req, res) => {
    var orderInfo = req.body.orderInfo;
    var partnerCode = 'MOMO';
    var redirectUrl = 'http://localhost:3000/admin/thanh-toan/success';
    var ipnUrl = 'https://99f7-113-183-211-171.ngrok-free.app';
    var requestType = "payWithMethod";
    var amount = req.body.amount;
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = '';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';

    var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    });

    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        },
        data: requestBody
    }

    try {
        const result = await axios(options);
        return res.status(200).json(result.data);
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Lỗi server",
            error: error.response.data
        });
    }
}

exports.callBack = async (req, res) => {
    const { orderId, transId, name, amount, email, resultCode } = req.body;
    try {
        const HTMLContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #4CAF50;">Cảm ơn bạn đã thanh toán!</h2>
          <p style="font-size: 16px;">Xin chào,</p>
          <p style="font-size: 16px;">Đơn hàng <strong>${orderId}</strong> của bạn với tổng giá trị <strong>${amount} VND</strong> đã được xử lý thành công.</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Mã đơn hàng</th>
              <td style="padding: 10px; border: 1px solid #ddd;">${orderId}</td>
            </tr>
            <tr>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Mã giao dịch</th>
              <td style="padding: 10px; border: 1px solid #ddd;">${transId}</td>
            </tr>
            <tr>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Tên khách hàng</th>
              <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Số tiền</th>
              <td style="padding: 10px; border: 1px solid #ddd;">${amount} VND</td>
            </tr>
          </table>

          <p style="font-size: 16px; margin-top: 20px;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.</p>

          <p style="font-size: 16px;">Trân trọng,<br/><strong>FoodSeeker</strong></p>

          <div style="background-color: #f9f9f9; padding: 10px; margin-top: 20px; text-align: center;">
            <p style="font-size: 12px; color: #999;">Email này được gửi tự động. Vui lòng không trả lời email này.</p>
          </div>
        </div>
    `
        emailService.sendEmail(email, `Hóa đơn xác nhận thanh toán thành công`, HTMLContent, (error, info) => {
            if (error) {
                return res.status(500).json({
                    statusCode: 500,
                    message: "Gửi email thất bại"
                });
            } else {
                return res.status(200).json({
                    statusCode: 200,
                    message: "Thanh toán thành công và đã gửi email"
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

}


exports.checkStatus = async (req, res) => {
    try {
        const { orderId } = req.body;
        const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`
        const signature = crypto.createHmac("sha256", secretKey)
            .update(rawSignature)
            .digest('hex')
        const requestBody = JSON.stringify({
            partnerCode: 'MOMO',
            requestId: orderId,
            orderId: orderId,
            signature: signature,
            lang: 'vi'
        })
        const options = {
            method: 'POST',
            url: 'https://test-payment.momo.vn/v2/gateway/api/query',
            headers: {
                'Content-Type': 'application/json',
            },
            data: requestBody
        }
        const result = await axios(options);
        return res.status(200).json(result.data)
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

}

exports.getThanhtoan = async (req, res) => {
    try {
    const thanhtoan = await Thanhtoandki.findAll({
        attributes: ["id_thanhtoan", "ma_don", "tong_tien", "noi_dung", "trang_thai", "thoi_gian", "ma_giao_dich", "id_nguoidung"],
        order: [["id_thanhtoan", "DESC"]]
    });
    res.status(200).json({
        message: "Danh sách đơn thanh toán",
        data: thanhtoan,
    });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi server",
        error: error.message,
      });
    }
    
}

exports.getThanhtoanById = async (req, res) => {
    try {
    let id_thanhtoan = parseInt(req.params.id_thanhtoan)
    if (isNaN(id_thanhtoan)) {
        return res.status(404).json({
            "message": "Id không tồn tại",
            "data": []
        })
    }

    const thanhtoan = await Thanhtoandki.findByPk(id_thanhtoan, {
        attributes: ["id_thanhtoan", "ma_don", "tong_tien", "noi_dung", "trang_thai", "thoi_gian", "ma_giao_dich", "id_nguoidung"],
    })
    res.status(200).json({
        messages: "Đơn thanh toán với id: " + id_thanhtoan,
        data: thanhtoan
    })
    } catch (error) {
      res.status(500).json({
        message: "Lỗi server",
        error: error.message,
      });
    }
    
}

exports.postThanhtoan = async (req, res) => {
    try {
    const { ma_don, tong_tien, noi_dung, trang_thai, thoi_gian, ma_giao_dich, id_nguoidung } = req.body;
    const thanhtoan = await Thanhtoandki.create({
        ma_don,
        tong_tien,
        noi_dung,
        trang_thai,
        thoi_gian,
        ma_giao_dich,
        id_nguoidung,

    });
    res.status(201).json({
        message: 'Thêm đơn thanh toán thành công',
        data: thanhtoan.toJSON(),
    });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi server",
        error: error.message,
      });
    }
    
};

exports.putThanhtoan = async (req, res) => {
    try {
        const id_thanhtoan = parseInt(req.params.id_thanhtoan);
        if (isNaN(id_thanhtoan)) {
            return res.status(404).json({
                message: "Không tìm thấy!",
                data: [],
            });
        }
        const values = {
            ma_don: req.body.ma_don,
            tong_tien: req.body.tong_tien,
            noi_dung: req.body.noi_dung,
            trang_thai: req.body.trang_thai,
            thoi_gian: req.body.thoi_gian,
            ma_giao_dich: req.body.ma_giao_dich,
            id_nguoidung: req.body.id_nguoidung,
        };
        const thanhtoan = await Thanhtoandki.update(values, {
            where: {
                id_thanhtoan: id_thanhtoan,
            },
        });
        res.status(201).json({
            message: 'Cập nhật đơn thanh toán thành công',
            data: values
        });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi server",
        error: error.message,
      });
    }
    
};
const { Op } = require("sequelize");
exports.getTongTien = async (req, res) => {
    const { month } = req.params; // Lấy tháng từ param truyền vào
    const year = new Date().getFullYear(); // Lấy năm hiện tại

    try {
        // Kiểm tra xem tháng có hợp lệ không
        if (!month || month < 1 || month > 12) {
            return res.status(400).json({
                message: "Tháng phải là một số từ 1 đến 12."
            });
        }

        // Tính tổng tiền trong tháng
        const tongTien = await Thanhtoandki.sum('tong_tien', {
            where: {
                created_at: {
                    [Op.and]: [
                        { [Op.gte]: new Date(year, month - 1, 1) }, // Ngày bắt đầu của tháng
                        { [Op.lt]: new Date(year, month, 1) } // Ngày bắt đầu của tháng tiếp theo
                    ]
                },
                trang_thai: 0 
            }
        });

        res.status(200).json({
            message: `Tổng tiền cho tháng ${month} năm ${year}`,
            tongTien: tongTien || 0
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};