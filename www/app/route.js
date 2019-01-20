// import { Router, Route } from 'dva/router';
import {
  Router,
  Route,
  IndexRoute,
  Redirect,
  browserHistory,
} from 'react-router';
import React from 'react';
import Layout from './containers/Layout';
import StaffTab from './containers/StaffTab';
import ShuoShuo from './containers/ShuoShuo';
import Register from './containers/Register';

export default ({ history } = {}) => (
  <Router history={history}>
    <Route path="/" component={Layout}>
      {/* <IndexRoute component={StaffTab} /> */}
      {/* <Route path="/shuoshuo" component={ShuoShuo} />
      <Route path="/register" component={Register} /> */}
    </Route>
  </Router>
);
