const formidable = require('formidable');
const url = require('url');
const path = require('path');
const Talk = require('../models/Talk');

// var timeago = require("timeago.js");

// var gm = require("gm");
// var fs = require("fs");

// 处理上传的图片
exports.uploadPic = (req, res) => {
  const form = new formidable.IncomingForm();
  // 设置上传地址
  form.uploadDir = '../www/uploads/shuoshuopic';
  form.parse(req, (err, fileds, files) => {
    // fileds 是携带的参数 ； files是携带的文件
    if (files.file.type != 'image/jpeg' && files.avatar.type != 'image/png') {
      res.send('请传jpeg文件或者png文件！');
      res.json({ result: -1 });
      return;
    }
    const purepath = path.basename(url.parse(files.file.path).pathname);
    const picPath = purepath;
    res.json({ result: 1, picPath });
  });
};

// 发帖
exports.submitShuoShuo = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fileds) => {
    // const author = req.session.user._id;
    console.log(req.session.user, 9999999);
    const text = fileds.text;
    const email = fileds.email;
    const pathArr = fileds.pathArr ? JSON.parse(fileds.pathArr) : [];

    const talk = new Talk({
      text,
      pathArr,
      email,
      date: new Date(),
    });
    // 存储
    talk.save(err => {
      res.json({ talk });
    });
  });
};

exports.init = (req, res) => {
  // 获取talks数据库中的所有数据
  Talk.find({})
    .sort({ date: -1 })
    .exec((err, docs) => {
      res.json({ talks: docs });
    });
};

// 删帖
exports.removeTalk = (req, res) => {
  // 获取talks数据库中的所有数据
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fileds) => {
    // 从数据库中查找所有的数据
    const id = fileds.id;
    Talk.remove({ _id: id }, (err, n) => {
      if (err) {
        console.log('删除失败');
        res.json({ result: -1 });
        return;
      }
      res.json({ result: 1 });
      console.log('删除成功');
    });
  });
};
