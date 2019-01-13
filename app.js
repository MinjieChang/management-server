var express = require("express");
var app = express();
app.use(express.static("www"));

// 开始打开数据库
var mongoose = require('mongoose');
var session = require('express-session');
// 创建数据库，并连接到此数据库
mongoose.connect('mongodb://127.0.0.1:27017/staffManagement'); 
//设置session，来自API
app.use(session({
	secret: 'cmj',
	resave: false,
	saveUninitialized: true
}));

// 引入后端控制器
var profileCtrl = require("./controllers/profileCtrl.js");
var registerCtrl = require("./controllers/registerCtrl.js");
var loginCtrl = require("./controllers/loginCtrl.js");
var staffCtrl = require("./controllers/staffCtrl.js");

/*    以下是发表说说的路由清单    */

// 上传图片
app.post("/uploadPic", profileCtrl.uploadPic);
/*   注册页面   */
// 验证邮箱是否可用
app.patch("/emailConfirm",registerCtrl.emailConfirm);
// 注册用户
app.post("/register",registerCtrl.register);
// 用户登录
app.post("/login",loginCtrl.login);
// 退出
app.get("/logOut",loginCtrl.logOut);
// 退出后刷新页面
app.get("/refresh",loginCtrl.refresh);
// 发表说说
app.post("/submitShuoShuo",profileCtrl.submitShuoShuo);
// 初始获取说说
app.get("/init",profileCtrl.init);
// 删除说说
app.post("/removeTalk",profileCtrl.removeTalk);


/* 以下是所有的对员工数据的操作 */
// 获取员工数据
app.post("/staffs",staffCtrl.staffs);
// 修改员工数据
app.patch("/changeData",staffCtrl.changeData);
// 删除员工
app.delete("/del",staffCtrl.del);
// 添加员工
app.post("/add",staffCtrl.add);

app.listen(3000,(err)=>{
	if (err) {
		console.log("开启失败");
	}
	console.log(3000);
});
