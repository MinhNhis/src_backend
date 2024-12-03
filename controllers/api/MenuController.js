const Menus = require("../../models/Menu.js");

exports.paginator = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: Menu } = await Menus.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["id_menu", "DESC"]]
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: Menu,
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

exports.findAll = async (req, res, next) => {
  try {
    const Menu = await Menus.findAll({
      order: [["id_menu", "DESC"]]
    });
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: Menu,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.findOne = async (req, res, next) => {
  try {
    let id = req.params.id_menu;
    const maMenu = await Menus.findByPk(id);
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: maMenu,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.createMenu = async (req, res, next) => {
  try {
    const object = {
      ten_menu: req.body.ten_menu,
      gia: req.body.gia,
      hinh_anh: req.file.filename,
      id_danhmuc: req.body.id_danhmuc,
      id_quanan: req.body.id_quanan,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,
    };
    const menu = await Menus.create(object);
    res.status(200).json({
      status: "True",
      message: "Thành Công",
      data: menu.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.deleteMenu = async (req, res, next) => {
  try {
    let id = req.params.id_menu;
    const Menu = await Menus.destroy({
      where: {
        id_menu: id,
      },
    });
    res.status(200).json({
      status: "True",
      message: "Xóa thành công",
      data: Menu,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }

};

exports.updateMenu = async (req, res, next) => {
  try {
    let id = req.params.id_menu;
    const listmenu = {
      ten_menu: req.body.ten_menu,
      gia: req.body.gia,
      hinh_anh: req.file.filename,
      id_danhmuc: req.body.id_danhmuc,
      id_quanan: req.body.id_quanan,
      created_user: req.body.created_user,
      updated_user: req.body.updated_user,

    };
    const menu = await Menus.update(listmenu, {
      where: {
        id_menu: id,
      },
    }); ``
    res.status(201).json({
      status: "True",
      message: "Cập nhật thành công",
      data: listmenu,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};