const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('config-lite')(__dirname);
const expressFormidable = require('express-formidable');
const { ValidationError } = require('express-validation');
const router = require('./router');
const connectMongo = require('./models');
const pkg = require('./package');
const { ERROR_CODE } = require('./constant');

connectMongo();

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('../www/dist'));

app.use(
  session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
      maxAge: config.session.maxAge, // 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({
      url: config.mongodb, // mongodb 地址
    }),
  }),
);

router(app);

app.use(
  expressFormidable({
    uploadDir: path.join(__dirname, 'asserts/uploads'),
    keepExtensions: true,
  }),
);

app.use((err, req, res, next) => {
  console.error(err, 'middleware error');
  if (err instanceof ValidationError) {
    const errorMessage = err.errors
      .map(({ field, messages }) => `${field.join(',')}: ${messages.join(',')}`)
      .join(',');
    return res.json({ errorMessage, errorCode: ERROR_CODE.INVALID_PARAM });
  }
  res.status(500).send(err);
  next(err);
});

app.listen(8000, err => {
  if (err) {
    console.log('开启失败');
  }
  console.log(`${pkg.name} port on: 8000`);
});
