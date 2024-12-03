const BaiViet = require("../../models/Baiviet");

exports.paginator = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const offset = (page - 1) * limit;

        const { count, rows: baiviet } = await BaiViet.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [["id_baiviet", "DESC"]],
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            status: "True",
            message: "Thành Công",
            data: baiviet,
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

exports.getBaiViet = async (req, res, next) => {
    try {
        const baiviets = await BaiViet.findAll({
            attributes: ["id_baiviet", "tieu_de", "noi_dung", "hinh_anh", "ngay_dang", "created_user"],
            order: [["id_baiviet", "DESC"]]
        });
        res.status(200).json({
            message: "Danh sách bài viết",
            data: baiviets,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

};

exports.addBaiViet = async (req, res) => {
    try {
        const baiviets = await BaiViet.create({
            tieu_de: req.body.tieu_de,
            noi_dung: req.body.noi_dung,
            hinh_anh: req.file ? req.file.filename : "",
            ngay_dang: req.body.ngay_dang,
            created_user: req.body.created_user
        });
        res.status(201).json({
            messages: "Thêm thành công !",
            data: baiviets.toJSON(),
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

};

exports.getBaiVietById = async (req, res, next) => {
    try {
        let id = req.params.id_baiviet;
        const baiviet = await BaiViet.findByPk(id);
        res.status(200).json({
            status: "True",
            message: "Lấy thành công 1 bài viết",
            data: baiviet,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

};

exports.deleteBaiViet = async (req, res, next) => {
    try {
        let id_baiviet = req.params.id_baiviet;

        const baiviet = await BaiViet.destroy({
            where: {
                id_baiviet: id_baiviet,
            },
        });
        res.status(200).json({
            messages: "Xóa thành công bài viết!",
            data: baiviet,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

};

exports.updateBaiViet = async (req, res) => {
    try {
        let id = req.params.id_baiviet;

        // Lấy bài viết hiện tại từ cơ sở dữ liệu
        const currentBaiViet = await BaiViet.findOne({ where: { id_baiviet: id } });

        if (!currentBaiViet) {
            return res
                .status(404)
                .json({ status: "False", message: "Bài viết không tồn tại" });
        }

        const listbaiviet = {
            tieu_de: req.body.tieu_de,
            noi_dung: req.body.noi_dung,
            // Kiểm tra xem có tệp hình ảnh mới không
            hinh_anh: req.file ? req.file.filename : currentBaiViet.hinh_anh,
            ngay_dang: req.body.ngay_dang,
            created_user: req.body.created_user
        };

        // Cập nhật bài viết
        await BaiViet.update(listbaiviet, {
            where: {
                id_baiviet: id,
            },
        });

        res.status(200).json({
            status: "True",
            message: "Cập nhật thành công",
            data: listbaiviet,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

};
