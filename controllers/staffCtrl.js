
// 先将所有的数据拉取出来
// app.get("/init",(req,res)=>{
// 	fs.readFile("./db/staff.json",(err,data)=>{
// 		var list = JSON.parse(data.toString()).list;
// 		res.json({"data":list});
// 	});
// });
var fs = require("fs");
var formidable = require("formidable");
var _ = require("underscore");
// 这个接口用来筛选数据
exports.staffs = (req,res)=>{
	fs.readFile("./db/staff.json",(err,data)=>{
		var form = new formidable.IncomingForm();
		form.parse(req,(err,fileds)=>{
			// 获取的所有的数据
			var list = JSON.parse(data.toString()).list;

			// 根据筛选条件筛选结果
			var filter = JSON.parse(fileds.filter);

			list = list.filter((item)=>{
				return item.engname == filter;
			}); 

			// 排序接口
			var order = JSON.parse(fileds.order);
			var field = order.field;
			var order = order.order;

			if(order == "ascend"){
	  			list = _.sortBy(list , field);
	  		}else{
	  			list = _.sortBy(list , field).reverse();
	  		}

			// console.log(list);
			res.json({"data":list});
		});
	});
}
// app.post("/staffs",(req,res)=>{
	
// });

// 修改数据的接口
exports.changeData = (req,res)=>{
	var form = new formidable.IncomingForm();
	form.parse(req,(err,fileds)=>{
		// fields 是个json对象，value id 和 key
		var value = fileds.value;
		var id = fileds.id;
		var key = fileds.key;
		// 读取数据，再进行比对修改数据
		fs.readFile("./db/staff.json",(err,data)=>{
			var list = JSON.parse(data.toString()).list;
			list.forEach((item)=>{
				if (item.id == id) {
					item[key] = value;
				}
			});
			// 再将修改的数据写入
			fs.writeFile("./db/staff.json",JSON.stringify({list}),function (err) {
				if (err) {
					return console.error(err);
				}
				console.log("写入成功");
			});
		})
	})
}
// app.patch("/changeData",(req,res)=>{
	
// })

// 封装删除数据的方法
function delStaff(id) {
	fs.readFile("./db/staff.json",(err,data)=>{
		var list = JSON.parse(data.toString()).list;
		list = list.filter((item)=>{
			return item.id != id;
		});
		// 再将修改的数据写入
		fs.writeFile("./db/staff.json",JSON.stringify({list}),function (err) {
			if (err) {
				return console.error(err);
			}
			console.log("删除成功");
		});
	})
}

// 删除数据的接口
exports.del = (req,res)=>{
	var form = new formidable.IncomingForm();
	form.parse(req,(err,fileds)=>{
		var id = fileds.id;
		delStaff(id);
	});
}

// app.delete("/del",(req,res)=>{
// })

// 封装添加数据的方法
function addStaff(staff) {
	fs.readFile("./db/staff.json",(err,data)=>{
		var list = JSON.parse(data.toString()).list;
		list.push(staff);
		// 再将修改的数据写入
		fs.writeFile("./db/staff.json",JSON.stringify({list}),function (err) {
			if (err) {
				return console.error(err);
			}
			console.log("添加成功");
		});
	})
}

// 添加员工的接口
exports.add = (req,res)=>{
	var form = new formidable.IncomingForm();
	form.parse(req,(err,fileds)=>{
		addStaff(fileds.newStaff);
	});
}
// app.post("/add",(req,res)=>{
// })

