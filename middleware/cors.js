exports.allowCrossDomain = (req, res, next) => {
  // 'http://localhost:8080'
  res.header('Access-Control-Allow-Origin', req.headers.origin); // 必须重新设置，把origin的域加上去
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true'); // 和客户端对应，必须设置以后，才能接收cookie.
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  );

  next();
};
