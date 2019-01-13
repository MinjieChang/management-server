import { Router, Route } from 'dva/router';
import React from 'react';
import StaffTab from './containers/StaffTab';
import ShuoShuo from './containers/ShuoShuo';
import Register from './containers/Register';

export default ({ history }) => (
  <Router history={history}>
    <Route path="/" component={StaffTab} />
    <Route path="/shuoshuo" component={ShuoShuo} />
    <Route path="/register" component={Register} />
  </Router>
);
