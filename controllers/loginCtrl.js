var formidable = require("formidable");
var crypto = require("crypto");
var User = require("../models/User.js");

//执行登录
exports.login = (req,res)=>{
	var form = new formidable.IncomingForm();
	form.parse(req , (err , fileds) => {

		var user = JSON.parse(fileds.value);
		var email = user.email;
		var password = user.password;
		//再次加密密码,和注册时候的密码进行比较，看是否相同
		password = crypto.createHash("sha256").update(password + "cmj").digest("hex");	//加密密码
		
		//从数据库中读取这个用户的信息
		User.find({"email" : email} , (err , docs) => {
			if(docs.length == 0){
				//没有这个email的人
				res.json({"result" : -1});
				return;
			}

			//这个人
			var user = docs[0];
			//验证密码是否相同
			if(password === user.password){
				// 将用户信息传递回去，登陆成功下发session
				req.session.doLogin = true;
				req.session.email = email;
				res.json({"result" : 1,user});
			}else{
				res.json({"result" : -1});
			}
		});
	});
};

// 每次请求都会携带session
exports.refresh = (req,res)=>{
	if (req.session.doLogin) {
		User.find({"email":req.session.email},(err,docs)=>{
			var user = docs[0];
			if (user) {
				res.json({"result":1,user});
			}
		})
	}else{
		res.json({"result":-1});
	}
}

// 退出
exports.logOut = (req,res)=>{
	req.session.doLogin = false;
	res.json({"result":1});
}




