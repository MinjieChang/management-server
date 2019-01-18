const fs = require('fs');
const formidable = require('formidable');
const _ = require('underscore');
const { createStaff } = require('../dao/staff');
const { assertTruth } = require('../util');

// 这个接口用来筛选数据
exports.staffs = (req, res) => {
  fs.readFile('./db/staff.json', (err, data) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fileds) => {
      // 获取的所有的数据
      let list = JSON.parse(data.toString()).list;

      // 根据筛选条件筛选结果
      const filter = JSON.parse(fileds.filter);

      list = list.filter(item => item.engname == filter);

      // 排序接口
      var order = JSON.parse(fileds.order);
      const field = order.field;
      var order = order.order;

      if (order == 'ascend') {
        list = _.sortBy(list, field);
      } else {
        list = _.sortBy(list, field).reverse();
      }

      // console.log(list);
      res.json({ data: list });
    });
  });
};
// app.post("/staffs",(req,res)=>{

// });

// 修改数据的接口
exports.changeData = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fileds) => {
    // fields 是个json对象，value id 和 key
    const value = fileds.value;
    const id = fileds.id;
    const key = fileds.key;
    // 读取数据，再进行比对修改数据
    fs.readFile('./db/staff.json', (err, data) => {
      const list = JSON.parse(data.toString()).list;
      list.forEach(item => {
        if (item.id == id) {
          item[key] = value;
        }
      });
      // 再将修改的数据写入
      fs.writeFile('./db/staff.json', JSON.stringify({ list }), err => {
        if (err) {
          return console.error(err);
        }
        console.log('写入成功');
      });
    });
  });
};
// app.patch("/changeData",(req,res)=>{

// })

// 封装删除数据的方法
function delStaff(id) {
  fs.readFile('./db/staff.json', (err, data) => {
    let list = JSON.parse(data.toString()).list;
    list = list.filter(item => item.id != id);
    // 再将修改的数据写入
    fs.writeFile('./db/staff.json', JSON.stringify({ list }), err => {
      if (err) {
        return console.error(err);
      }
      console.log('删除成功');
    });
  });
}

// 删除数据的接口
exports.del = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fileds) => {
    const id = fileds.id;
    delStaff(id);
  });
};

// app.delete("/del",(req,res)=>{
// })

// 封装添加数据的方法
function addStaff(staff) {
  fs.readFile('./db/staff.json', (err, data) => {
    const list = JSON.parse(data.toString()).list;
    list.push(staff);
    // 再将修改的数据写入
    fs.writeFile('./db/staff.json', JSON.stringify({ list }), err => {
      if (err) {
        return console.error(err);
      }
      console.log('添加成功');
    });
  });
}

// 添加员工的接口
exports.add = async ({ ...staff }) => {
  const savedS = await createStaff(staff);
  assertTruth({
    value: savedS,
    message: 'save staff error',
  });
  return { id: savedS._id };
};
