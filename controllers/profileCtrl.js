var formidable = require("formidable");
var url = require("url");
var path = require("path");
var Talk = require("../models/Talk");
var User = require("../models/User");
// var timeago = require("timeago.js");

// var gm = require("gm");
// var fs = require("fs");


// 处理上传的图片
exports.uploadPic = (req,res)=>{
	var form = new formidable.IncomingForm();
	//设置上传地址
	form.uploadDir = "./www/uploads/shuoshuopic";
	form.parse(req , (err , fileds , files) => {
		// fileds 是携带的参数 ； files是携带的文件
		if(files.file.type != "image/jpeg" && files.avatar.type != "image/png"){
			res.send("请传jpeg文件或者png文件！");
			res.json({"result":-1});
			return;	
		}
		//将文件名存为session
		//提炼出最终的文件名
		//https://nodejs.org/dist/latest-v6.x/docs/api/path.html#path_path_basename_path_ext
		var purepath = path.basename(url.parse(files.file.path).pathname);
		// var picPath = files.file.path;
		var picPath = purepath;
		//跳转
		// console.log(files.file.path);  文件的绝对地址 
		// www/uploads/shuoshuopic/upload_e294363ed1d7ea2f9833ee9f435eb8c2
		// console.log(req.session.uploadPic);  文件名
		// upload_e294363ed1d7ea2f9833ee9f435eb8c2

		res.json({"result":1,"picPath":picPath});
	});
}

//发帖
exports.submitShuoShuo = (req,res) => {
	var form = new formidable.IncomingForm();
	form.parse(req , (err , fileds , files) => {
		var text = fileds.text;
		var email = fileds.email;
		var pathArr = JSON.parse(fileds.pathArr);

		// 设置时间格式
		// var timeagoInstance = new timeago();
		// timeagoInstance.format('2016-06-12', 'zh_CN');
		// console.log(timeagoInstance);

		var talk = new Talk({
			"text" : text, 
			"pathArr" : pathArr,
			"email" : email,
			"date" : new Date()
		});
		// 存储
		talk.save((err)=>{
			res.json({talk});
		});
		
	});
}

exports.init = (req,res)=>{
	// 获取talks数据库中的所有数据
	Talk.find({}).sort({"date":-1}).exec((err,docs)=>{
		res.json({"talks":docs});
	})
}

// 删帖
exports.removeTalk = (req,res)=>{
	// 获取talks数据库中的所有数据
	var form = new formidable.IncomingForm();
	form.parse(req,(err,fileds)=>{
		// 从数据库中查找所有的数据
		var id = fileds.id;
		Talk.remove({"_id" : id} , (err , n) => {
			if (err) {
				console.log("删除失败");
				res.json({"result":-1});
				return;
			}
			res.json({"result":1});
			console.log("删除成功");
	    });
	})

}

