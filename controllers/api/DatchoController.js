const Datcho = require("../../models/Datcho");
const Nguoidung = require("../../models/NguoiDung")
const emailService = require('../../models/Email')
const axios = require('axios');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

var accessKey = 'F8BBA842ECF85';
var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
exports.checkOutDatCoc = async (req, res) => {
    const id_quanan = req.body.id_quanan
    var orderInfo = req.body.orderInfo;
    var partnerCode = 'MOMO';
    var redirectUrl = `http://localhost:3000/chi-tiet/${id_quanan}`;
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

exports.checkStatusDatCoc = async (req, res) => {
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

exports.paginator = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const offset = (page - 1) * limit;

        const { count, rows: datcho } = await Datcho.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [["id_datcho", "DESC"]]
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            status: "True",
            message: "Thành Công",
            data: datcho,
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

exports.getDatcho = async (req, res, next) => {
    try {
        const datcho = await Datcho.findAll({
            attributes: ["id_datcho", "ma_don", "tien_coc", "ma_giao_dich", "ten_quan", "ten_kh", "sdt_kh", "email_kh", "ngay_dat", "thoi_gian", "so_luong_nguoi", "trang_thai", "ly_do_huy", "yeu_cau_khac", "id_nguoidung", "id_quanan", "is_danhgia"],
            order: [["id_datcho", "DESC"]]
        });
        res.status(200).json({
            message: "Danh sách đơn",
            data: datcho
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

};

exports.getDatchoById = async (req, res, next) => {
    try {
        let id_datcho = parseInt(req.params.id_datcho)
        if (isNaN(id_datcho)) {
            return res.status(404).json({
                "message": "Id không tồn tại",
                "data": []
            })
        }

        const datcho = await Datcho.findByPk(id_datcho, {
            attributes: ["id_datcho", "ma_don", "tien_coc", "ma_giao_dich", "ten_quan", "ten_kh", "sdt_kh", "email_kh", "ngay_dat", "thoi_gian", "so_luong_nguoi", "trang_thai", "ly_do_huy", "yeu_cau_khac", "id_nguoidung", "id_quanan", "is_danhgia"]
        })
        res.status(200).json({
            messages: "Đơn hàng với id: " + id_datcho,
            data: datcho
        })
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

}

exports.postDatcho = async (req, res, next) => {
    try {
        const { ma_don, tien_coc, ma_giao_dich, ten_quan, ten_kh, sdt_kh, email_kh, ngay_dat, thoi_gian, so_luong_nguoi, trang_thai, ly_do_huy, yeu_cau_khac, id_nguoidung, id_quanan, is_danhgia } = req.body;
        const datcho = await Datcho.create({
            ma_don,
            tien_coc,
            ma_giao_dich,
            ten_quan,
            ten_kh,
            sdt_kh,
            email_kh,
            ngay_dat,
            thoi_gian,
            so_luong_nguoi,
            trang_thai,
            ly_do_huy,
            yeu_cau_khac,
            id_nguoidung,
            id_quanan,
            is_danhgia
        });

        res.status(201).json({
            message: 'Thêm thành công',
            data: datcho.toJSON(),
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

};

exports.putDatcho = async (req, res) => {
    try {
        let id_datcho = parseInt(req.params.id_datcho)
        if (isNaN(id_datcho)) {
            return res.status(404).json({
                "message": "Id không tồn tại",
                "data": []
            })
        }
        const values = {
            ma_don: req.body.ma_don,
            tien_coc: req.body.tien_coc,
            ma_giao_dich: req.body.ma_giao_dich,
            ten_quan: req.body.ten_quan,
            ten_kh: req.body.ten_kh,
            sdt_kh: req.body.sdt_kh,
            email_kh: req.body.email_kh,
            ngay_dat: req.body.ngay_dat,
            thoi_gian: req.body.thoi_gian,
            so_luong_nguoi: req.body.so_luong_nguoi,
            trang_thai: req.body.trang_thai,
            ly_do_huy: req.body.ly_do_huy,
            yeu_cau_khac: req.body.yeu_cau_khac,
            id_nguoidung: req.body.id_nguoidung,
            id_quanan: req.body.id_quanan,
            is_danhgia: req.body.is_danhgia
        }
        const dichvu = await Datcho.update(values, {
            where: {
                id_datcho: id_datcho
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

exports.deleteDatcho = async (req, res, next) => {
    try {
        let id_datcho = parseInt(req.params.id_datcho)
        if (isNaN(id_datcho)) {
            return res.status(404).json({
                "message": "Id không tồn tại",
                "data": []
            })
        }

        const datcho = await Datcho.destroy({
            where: {
                id_datcho: id_datcho
            }
        });
        res.status(200).json({
            messages: "Xóa thành công !",
            data: datcho
        })
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

}

exports.cancelSendMail = async (req, res, next) => {
    let id_datcho = parseInt(req.params.id_datcho);
    const reason = req.body.reason || "Không có lý do cụ thể";

    if (isNaN(id_datcho)) {
        return res.status(404).json({
            "message": "Id không tồn tại",
            "data": []
        });
    }
    const datcho = await Datcho.findByPk(id_datcho);
    if (!datcho) {
        return res.status(404).json({
            "message": "Đơn hàng không tồn tại",
            "data": []
        });
    }
    try {
        const Html = `<div style="font-family: Arial, sans-serif; color: #333;">
            <p style="font-size: 16px;">Thông tin đặt chỗ</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Mã đơn</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${datcho.ma_don}</td>
              </tr>
              <tr>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Mã giao dịch</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${datcho.ma_giao_dich}</td>
              </tr>
              <tr>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Tiền cọc</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${datcho.tien_coc} (30%)</td>
              </tr>
               <tr>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Tên quán ăn</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${datcho.ten_quan}</td>
              </tr>
               <tr>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Thời gian</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${datcho.thoi_gian}</td>
              </tr>
              <tr>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Số lượng người</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${datcho.so_luong_nguoi}</td>
              </tr>
               <tr>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Ngày đặt</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${datcho.ngay_dat}</td>
              </tr>
              <tr>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">${datcho.trang_thai === 2 ? "Lý do" : "Trạng thái"}</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${reason}</td>
              </tr>
            </table>
            
            <p style="font-size: 16px; margin-top: 20px;">Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.</p>
            
            <p style="font-size: 16px;">Trân trọng,<br/><strong>FoodSeeker</strong></p>
          </div>
        `
        await emailService.sendEmail(datcho.email_kh, datcho.trang_thai === 2 ? `Thông báo đơn đặt chỗ của bạn đã bị hủy` : `Thông báo đơn hàng đã được xử lý`, Html);
    } catch (error) {
        console.error("Error sending email: ", error);
        return res.status(500).json({
            "message": "Đã xảy ra lỗi trong quá trình gửi email thông báo.",
            "data": []
        });
    }
}

exports.cancelSendMailByUser = async (req, res, next) => {
    let id_datcho = parseInt(req.params.id_datcho);
    let id_chuquan = parseInt(req.params.id_chuquan);
    const reason = req.body.reason || "Không có lý do cụ thể";

    if (isNaN(id_datcho)) {
        return res.status(404).json({
            "message": "Id không tồn tại",
            "data": []
        });
    }
    const datcho = await Datcho.findByPk(id_datcho);
    const chuquan = await Nguoidung.findByPk(id_chuquan);

    if (!datcho) {
        return res.status(404).json({
            "message": "Đơn hàng không tồn tại",
            "data": []
        });
    }

    if (!chuquan) {
        return res.status(404).json({
            "message": "Chủ quan không tồn tại",
            "data": []
        });
    }
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'minhnhidmn0502@gmail.com',
            pass: 'wpglckyqsavqgaws'
        }
    });
    const sendEmail = (to, subject, text, html) => {
        const mailOptions = {
            from: 'minhnhidmn0502@gmail.com',
            to: to,
            subject: subject,
            text: text,
            html: html,
        };

        return transporter.sendMail(mailOptions);
    };
    try {
        const Html = `<div style="font-family: Arial, sans-serif; color: #333;">
            <p style="font-size: 16px;">Thông tin đặt chỗ</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Tên quán ăn</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${datcho.ten_quan}</td>
              </tr>
               <tr>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Thời gian</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${datcho.thoi_gian}</td>
              </tr>
              <tr>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Số lượng người</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${datcho.so_luong_nguoi}</td>
              </tr>
               <tr>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Ngày đặt</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${datcho.ngay_dat}</td>
              </tr>
              <tr>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Lý do</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${reason}</td>
              </tr>
            </table>
            
            <p style="font-size: 16px; margin-top: 20px;">Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.</p>
            
            <p style="font-size: 16px;">Trân trọng,<br/><strong>FoodSeeker</strong></p>
          </div>
        `
        await emailService.sendEmail(chuquan.email, `Thông báo đơn đặt chỗ đã bị hủy`, Html);
    } catch (error) {
        console.error("Error sending email: ", error);
        return res.status(500).json({
            "message": "Đã xảy ra lỗi trong quá trình gửi email thông báo.",
            "data": []
        });
    }
}







