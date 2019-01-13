var mongoose = require('mongoose');

//schema就是规定的字段。
var talkSchema = new mongoose.Schema({
	"email" 	: String , 
	"text" 	: String , 
	"pathArr" : [String],
	"date" 		: Date
});

var Talk = mongoose.model("Talk" , talkSchema);

//向外暴露
module.exports = Talk;