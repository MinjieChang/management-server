const Staff = require('../models/Staff');

exports.createStaff = staff => {
  const r = Staff.create(staff);
  return r;
};

exports.deleteStaffById = id => Staff.findByIdAndRemove(id).exec();

// 更新员工的两种写法
exports.updateStaffById = (id, opt = {}) =>
  Staff.where({ _id: id })
    .setOptions({ overwrite: true })
    .update(opt)
    .exec();

exports.updateOneStaffById = (id, opt = {}) =>
  Staff.updateOne({ _id: id }, { $set: opt }).exec();

exports.findStaffById = id => Staff.findById(id).exec();

exports.getStaffs = (skip, limit) =>
  Staff.find()
    .skip(skip)
    .limit(limit)
    .exec();
