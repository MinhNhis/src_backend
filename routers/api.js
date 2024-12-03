const express = require('express');
const multer = require('multer');
// dang nhap google ne
const { googleLogin, googleCallback, verifyGoogleToken } = require('../controllers/api/AuthControllerapi');
const upload = multer({ dest: './uploads/' });

const DichvuController = require('../controllers/api/DichvuController');
const BaiDoXeController = require('../controllers/api/BaidoxeControllerapi');
const KhongkhiController = require('../controllers/api/KhongkhiControllerapi');
const KehoachController = require('../controllers/api/KehoachControllerapi');
const TiennghiController = require('../controllers/api/TiennghiControllerapi');
const NguoiDungController = require('../controllers/api/NguoiDungControllerapi')
const LoaiKHControllerapi = require('../controllers/api/LoaiKHControllerapi')
const CacDichVuControllerapi = require('../controllers/api/CacDichVuControllerapi')
const MenuController = require("../controllers/api/MenuController");
const DanhmucController = require('../controllers/api/DanhmucController');
const DanhgiaController = require('../controllers/api/DanhgiaControllerapi');
const QuananController = require('../controllers/api/QuananControllerapi');
const DatchoController = require('../controllers/api/DatchoController');
const ThanhtoanController = require('../controllers/api/ThanhtoanController');
const BaivietControllerapi = require('../controllers/api/BaivietControllerapi');
const AlldanhmucController = require('../controllers/api/AlldanhmucController');
const MenuorderController = require('../controllers/api/MenuorderController');
const LienheController = require ('../controllers/api/LienheController')

const router = express.Router();

//POST đăng nhập Google
router.post('/google', googleLogin);
//xác thực Google
router.get('/google/callback', googleCallback);
// Liên hệ
router.post('/lienhe', LienheController.Lienhe);
/************************* Bài Viết ****************************************************/
router.get('/baiviets', BaivietControllerapi.getBaiViet);
router.post('/baiviets', upload.single('hinh_anh'), BaivietControllerapi.addBaiViet);
router.get('/baiviets/:id_baiviet', BaivietControllerapi.getBaiVietById);
router.delete('/baiviets/:id_baiviet', BaivietControllerapi.deleteBaiViet);
router.put('/baiviets/:id_baiviet', upload.single('hinh_anh'), BaivietControllerapi.updateBaiViet);
router.get('/paginator-baiviet', BaivietControllerapi.paginator);
/*************************DỊCH VỤ ****************************************************/
router.get('/dich-vu', DichvuController.getDichvu);
router.get('/paginator-dichvu', DichvuController.paginator);
router.get('/dich-vu/:id_dichvu', DichvuController.getDichvuById);
router.post('/dich-vu', DichvuController.postDichvu);
router.put('/dich-vu/:id_dichvu', DichvuController.putDichvu);
router.delete('/dich-vu/:id_dichvu', DichvuController.deleteDichvu);
/*************************BÃI ĐỔ XE ****************************************************/
router.get('/baidoxes', BaiDoXeController.getBaiDoXe);
router.get('/paginator-baidoxe', BaiDoXeController.paginator)
router.post('/baidoxes', BaiDoXeController.createBaiDoXe);
router.put('/baidoxes/:id_baidoxe', BaiDoXeController.putBaidoxe);
router.delete('/baidoxes/:id_baidoxe', BaiDoXeController.deleteBaidoxe);
router.get('/baidoxes/:id_baidoxe', BaiDoXeController.getBaidoxeById);
/*************************KHÔNG KHÍ ****************************************************/
router.get('/khongkhis', KhongkhiController.getKhongkhi);
router.get('/paginator-khongkhi', KhongkhiController.paginator)
router.post('/khongkhis', KhongkhiController.createKhongkhi);
router.put('/khongkhis/:id_khongkhi', KhongkhiController.putKhongkhi);
router.delete('/khongkhis/:id_khongkhi', KhongkhiController.deleteKhongkhi);
router.get('/khongkhis/:id_khongkhi', KhongkhiController.getKhongkhiById);
/*************************KẾ HOẠCH ****************************************************/
router.get('/kehoachs', KehoachController.getKehoach);
router.get('/paginator-kehoach', KehoachController.paginator)
router.post('/kehoachs', KehoachController.createKehoach);
router.put('/kehoachs/:id_kehoach', KehoachController.putKehoach);
router.delete('/kehoachs/:id_kehoach', KehoachController.deleteKehoach);
router.get('/kehoachs/:id_kehoach', KehoachController.getKehoachById);
/*************************TIỆN NGHI ****************************************************/
router.get('/tiennghis', TiennghiController.getTiennghi);
router.get('/paginator-tiennghi', TiennghiController.paginator)
router.post('/tiennghis', TiennghiController.createTiennghi);
router.put('/tiennghis/:id_tiennghi', TiennghiController.putTiennghi);
router.delete('/tiennghis/:id_tiennghi', TiennghiController.deleteTiennghi);
router.get('/tiennghis/:id_tiennghi', TiennghiController.getTiennghiById);
/*************************NGƯỜI DÙNG ****************************************************/
router.get('/nguoidungs', NguoiDungController.getNguoiDung);
router.get('/paginator-nguoidung', NguoiDungController.paginator)
router.post('/nguoidungs', upload.single('hinh_anh'), NguoiDungController.postNguoiDung);
router.put('/nguoidungs/:id_nguoidung', upload.single('hinh_anh'), NguoiDungController.putNguoiDung);
router.get('/nguoidungs/:id_nguoidung', NguoiDungController.getNguoiDungByID);
router.delete('/nguoidungs/:id_nguoidung', NguoiDungController.deleteNguoiDung);
router.post('/login', NguoiDungController.login);
router.put('/changpassword/:id_nguoidung', NguoiDungController.ChangePassword);
router.post('/reset', NguoiDungController.resetPassword);
/*************************LOẠI KHÁCH HÀNG ****************************************************/
router.get('/loaikh', LoaiKHControllerapi.getLoaiKH);
router.get('/paginator-loaikh', LoaiKHControllerapi.paginator)
router.get('/loaikh/:id_loaikh', LoaiKHControllerapi.getLoaiKHByID);
router.post('/loaikh', LoaiKHControllerapi.postLoaiKH);
router.put('/loaikh/:id_loaikh', LoaiKHControllerapi.putLoaiKH);
router.delete('/loaikh/:id_loaikh', LoaiKHControllerapi.deleteLoaiKH);
/*************************CÁC TÙY CHỌN DỊCH VỤ ****************************************************/
router.get('/cacdichvu', CacDichVuControllerapi.getCacDichVu);
router.get('/paginator-cacdichvu', CacDichVuControllerapi.paginator)
router.get('/cacdichvu/:id_cacdichvu', CacDichVuControllerapi.getCacDichVuByID);
router.post('/cacdichvu', CacDichVuControllerapi.postCacDichVu);
router.put('/cacdichvu/:id_cacdichvu', CacDichVuControllerapi.putCacDichVu);
router.delete('/cacdichvu/:id_cacdichvu', CacDichVuControllerapi.deleteCacDichVu);
/*************************MENU ****************************************************/
router.get('/menu', MenuController.findAll);
router.get('/paginator-menu', MenuController.paginator)
router.get('/menu/:id_menu', MenuController.findOne);
router.delete('/menu/:id_menu', MenuController.deleteMenu);
router.post('/menu', upload.single('hinh_anh'), MenuController.createMenu);
router.put('/menu/:id_menu', upload.single('hinh_anh'), MenuController.updateMenu);
/*************************DANH MỤC ****************************************************/
router.get('/danhmuc', DanhmucController.findAll);
router.get('/paginator-danhmuc', DanhmucController.paginator)
router.get('/danhmuc/:id_danhmuc', DanhmucController.getDanhmucById);
router.post('/danhmuc', DanhmucController.createDanhmuc);
router.delete('/danhmuc/:id_danhmuc', DanhmucController.deleteDanhmuc);
router.put('/danhmuc/:id_danhmuc', DanhmucController.updateDanhmuc);
/*************************DANH MỤC ****************************************************/
router.get('/alldanhmuc', AlldanhmucController.findAll);
router.get('/alldanhmuc/:id_alldanhmuc', AlldanhmucController.getAllDanhmucById);
router.post('/alldanhmuc', AlldanhmucController.createAllDanhmuc);
router.put('/alldanhmuc/:id_alldanhmuc',AlldanhmucController.updateAllDanhmuc);
router.delete('/alldanhmuc/:id_alldanhmuc',AlldanhmucController.deleteAllDanhmuc)

router.get('/danhgias', DanhgiaController.getDanhgia);
router.get('/paginator-danhgia', DanhgiaController.paginator)
router.get('/danhgias/:id', DanhgiaController.getDanhGiaById);
router.post('/danhgias', upload.single('hinh_anh'), DanhgiaController.createDanhgia);
router.put('/danhgias/:id', upload.single('hinh_anh'), DanhgiaController.updateDanhgia);
router.delete('/danhgias/:id', DanhgiaController.deleteDanhgia);
/*************************DANH MỤC ****************************************************/
router.get('/quanans', QuananController.getQuanan);
router.get('/paginator-quanan', QuananController.paginator)
router.get('/quanans/:id', QuananController.getQuananById);
router.post('/quanans', upload.single('hinh_anh'), QuananController.createQuanan);
router.put('/quanans/:id', upload.single('hinh_anh'), QuananController.updateQuanan);
router.delete('/quanans/:id', QuananController.deleteQuanan);
router.get('/search-quanan', QuananController.searchQuanan);
router.put('/isdelete/:id', QuananController.isDelete);
/*************************ĐẶT CHỖ ****************************************************/
router.post('/paymentdatcoc', DatchoController.checkOutDatCoc);
router.post('/check-status-dat-coc', DatchoController.checkStatusDatCoc);
router.get('/dat-cho', DatchoController.getDatcho);
router.get('/paginator-datcho', DatchoController.paginator)
router.get('/dat-cho/:id_datcho', DatchoController.getDatchoById);
router.post('/dat-cho', DatchoController.postDatcho);
router.put('/dat-cho/:id_datcho', DatchoController.putDatcho);
router.delete('/dat-cho/:id_datcho', DatchoController.deleteDatcho);
router.post('/sendMail-dat-cho/:id_datcho', DatchoController.cancelSendMail);
router.post('/sendMail-dat-cho-user/:id_datcho/:id_chuquan', DatchoController.cancelSendMailByUser);
/*************************Thanh toán đki quán ****************************************************/
router.post('/payment', ThanhtoanController.checkOut);
router.post('/callback', ThanhtoanController.callBack);
router.post('/check-status', ThanhtoanController.checkStatus);
router.get('/thanh-toan', ThanhtoanController.getThanhtoan);
router.get('/thanh-toan/:id_thanhtoan', ThanhtoanController.getThanhtoanById);
router.post('/thanh-toan', ThanhtoanController.postThanhtoan);
router.put('/thanh-toan/:id_thanhtoan', ThanhtoanController.putThanhtoan);
router.get('/tong-tien/:month', ThanhtoanController.getTongTien);
//
router.get('/menuorder', MenuorderController.getMenuorder);
router.get('/menuorder/:id_menuorder', MenuorderController.getMenuorderById);
router.get('/paginator-menuorder', MenuorderController.paginator);
router.post('/menuorder', MenuorderController.addMenuorder);
router.put('/menuorder/:id_menuorder', MenuorderController.updateMenuorder);
router.delete('/menuorder/:id_menuorder', MenuorderController.deleteMenuorder);

module.exports = router;