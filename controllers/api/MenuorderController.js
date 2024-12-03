const Menuorder = require("../../models/Menuorder");

exports.paginator = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const offset = (page - 1) * limit;

        const { count, rows: menuorders } = await Menuorder.findAndCountAll({
            offset: offset,
            limit: limit,
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            status: "True",
            message: "Thành Công",
            data: menuorders,
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

exports.getMenuorder = async (req, res, next) => {
    try {
        const menuorders = await Menuorder.findAll({
            attributes: ["id_menuorder", "ten_mon", "so_luong", "gia", "id_datcho"],
            order: [["id_menuorder", "DESC"]]
        });
        res.status(200).json({
            message: "Danh sách món ăn order",
            data: menuorders,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

};

exports.addMenuorder = async (req, res) => {
    try {
        const menuorder = await Menuorder.create({
            ten_mon: req.body.ten_mon,
            so_luong: req.body.so_luong,
            gia: req.body.gia,
            id_datcho: req.body.id_datcho,
        });
        res.status(201).json({
            messages: "Thêm thành công !",
            data: menuorder.toJSON(),
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

};

exports.getMenuorderById = async (req, res, next) => {
    try {
        let id = req.params.id_menuorder;
        const menuorder = await Menuorder.findByPk(id);
        res.status(200).json({
            status: "True",
            message: `Lấy thành công đơn ${id}`,
            data: menuorder,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

exports.deleteMenuorder = async (req, res, next) => {
    try {
        let id = req.params.id_menuorder;
        const menuorder = await Menuorder.destroy({
            where: {
                id_menuorder: id,
            },
        });
        res.status(200).json({
            messages: "Xóa thành công !",
            data: menuorder,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }

};

exports.updateMenuorder = async (req, res) => {
    try {
        let id = req.params.id_menuorder;
        const obj = {
            ten_mon: req.body.ten_mon,
            so_luong: req.body.so_luong,
            gia: req.body.gia,
            id_datcho: req.body.id_datcho,
        };
        await Menuorder.update(obj, {
            where: {
                id_menuorder: id,
            },
        });

        res.status(200).json({
            status: "True",
            message: "Cập nhật thành công",
            data: obj,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};
