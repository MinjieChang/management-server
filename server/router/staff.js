const express = require('express');
const staffCtrl = require('../biz/staffCtrl');

const staffRouter = new express.Router();
// 获取员工数据
staffRouter.post('/staffs', staffCtrl.staffs);
// 修改员工数据
staffRouter.patch('/changeData', staffCtrl.changeData);
// 删除员工
staffRouter.delete('/del', staffCtrl.del);
// 添加员工
staffRouter.post('/add', staffCtrl.add);

module.exports = staffRouter;
