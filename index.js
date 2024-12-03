const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const cors = require('cors');
// code moi dang nhap gg ne
const session = require('express-session');
const passport = require('./controllers/api/AuthControllerapi').passport;
const authRouter = require('./routers/api.js'); 

const app = express();

// login gg ne
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
/**middleware */

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.static("uploads"));
const port = process.env.PORT || 3300;
app.use(cors({
  origin: '*'
}));

/** Sử dụng router xác thực gg */
app.use('/auth', authRouter);

/**------------------------------------------ */
const apiRouters = require('./routers/api');
app.use('/api', apiRouters);


app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});