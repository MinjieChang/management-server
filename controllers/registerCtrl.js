
var User = require("../models/User.js");
var formidable = require("formidable");
var crypto = require("crypto");
// 验证邮箱是否被注册过
exports.emailConfirm = (req,res)=>{
	var form = new formidable.IncomingForm();
	form.parse(req , (err , fileds) => {
		var email = fileds.email;
		// 从本地数据库中查找是否有该邮箱
		User.count({"email":email},(err,count)=>{
			if (count != 0) {
				console.log("邮箱被占用");
				res.json({"result" : -1});
				return;
			}
			res.json({"result" : 1});
		})
	});
}

// 注册接口
exports.register = (req,res)=>{
	var form = new formidable.IncomingForm();
	form.parse(req , (err , fileds) => {
		var user = JSON.parse(fileds.value);
		// 首先判断该邮箱是否唯一，然后将该用户存入数据库
		var email = user.email;
		var password = user.password;
		var nickname = user.nickname;

		//验证是否已经被占用
		User.count({"email" : email} , (err , count) => {
			if(count != 0){
				console.log("邮箱被占用");
				res.json({"result" : -1});
				return;
			};

			//符合条件的数据！写入数据库！
			password = crypto.createHash("sha256").update(password + "cmj").digest("hex");	//加密密码
			
			var user = new User({
				"email" 	: email , 
				"password" : password,
				"nickname" : nickname
			});
			user.save((err) => {
				if(err){
					console.log("注册失败");
					res.json({"result" : -2});
				}else{
					console.log("注册成功");
					res.json({"result" : 1});
				}
			})
		});
	});
}
