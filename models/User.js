var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	"email"	  	:   String , 
	"password"	: 	String ,
	"nickname"	: 	{
		"type"	:   String ,
		"default" : "我是昵称"
	},
	"signature" : {
		"type"  	: String,
		"default" 	: "并没有什么签名"
	},
	"avatar"	: {			//头像
		"type"		: String,
		"default"	: "images/avatar/avatar.png"
	}
});

// 这里相当于建了一个User表,下面就往这个表中添加数据
var User = mongoose.model("User" , userSchema);

//向外暴露
module.exports = User;