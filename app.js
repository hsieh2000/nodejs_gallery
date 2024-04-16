const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const session = require("express-session");
const MongoStore = require("connect-mongo");
const {DBHOST, DBPORT, DBNAME} = require("./config/config");


const app = express();

// 設置 session 與資料庫連線
app.use(session({
  name: "sid", //設置 cookie 的 name，默認值是：connect.sid
  secret: "jeremy", //參與加密的字符串(又稱簽名)
  saveUninitialized: false, //是否每次請求都設置一個 cookie 來儲存 session 的 id (是否每次request都要創建一個session對象，無論對方是否有使用session)
  resave: false, //是否每次請求時都重新保留 session,
  rolling: false,
  saveUninitialized: true,
  store: MongoStore.create({
      mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  // 設置sid的生命週期
  cookie: {
      httpOnly: true, //開啟後前端的js 無法操作這個 sid
      // 30 min
      maxAge: 1000*60*30, // 這一條是控制 sessonID 過期的時間，不只設定 cookie 也設定 db 內的 session 過期
      secure: false ,
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
