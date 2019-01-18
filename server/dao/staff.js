const Staff = require('../models/Staff');

// exports.createStaff = staff => {
//   const r = new Staff(staff).save();
//   return r;
// };
exports.createStaff = staff => {
  const r = Staff.create(staff);
  return r;
};
