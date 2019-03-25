const path = require('path');
const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const Staff = require('../models/Staff');

const testName1 = '233888';
const testName2 = '233999888';

const staff = {
  address: '23399',
  age: '2339999',
  birth: '1888-9-3',
  department: '233',
  email: '233',
  hireDate: '1888-9-3',
  name: testName1,
  phone: '17702725882',
  sex: '233',
};

describe('staff', () => {
  describe('post addStaff', () => {
    const agent = request.agent(app);
    beforeEach(done => {
      // 创建一个员工
      Staff.create({
        address: '23399',
        age: '2339999',
        birth: '1888-9-3',
        department: '233',
        email: '233@qq.com',
        hireDate: '1888-9-3',
        name: testName1,
        phone: '17702725882',
        sex: '233',
      })
        .then(() => done())
        .catch(done);
    });

    afterEach(done => {
      // 删除员工
      Staff.deleteMany({ name: { $in: [testName1, testName2] } })
        .then(() => done())
        .catch(() => done());
    });

    after(done => {
      done();
      process.exit();
    });

    // 开始测试, 邮箱错误
    it('wrong email', done => {
      agent
        .post('/staff/add')
        .type('form')
        .send({ ...staff })
        .redirects()
        .end((err, res) => {
          if (err) return done(err);
          //   console.log(res.text, 'res++++++');
          assert(res.text.match(/"email: \\"email\\" must be a valid email"/));
          return done(err);
        });
    });
  });
});
