const express = require('express');
const validate = require('express-validation');
const staffCtrl = require('../biz/staffCtrl');
const { createRouteHandler } = require('../util');
const { staffAdd } = require('./validation/staff');

const staffRouter = new express.Router();
// 获取员工数据
staffRouter.post('/staffs', staffCtrl.staffs);
// 修改员工数据
staffRouter.patch('/changeData', staffCtrl.changeData);
// 删除员工
staffRouter.delete('/del', staffCtrl.del);
// 添加员工
staffRouter.post(
  '/add',
  validate(staffAdd),
  createRouteHandler(({ body }) => staffCtrl.add({ ...body })),
);

module.exports = staffRouter;
