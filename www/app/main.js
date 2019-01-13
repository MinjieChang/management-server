import React from 'react';
import dva from 'dva';
import 'antd/dist/antd.css';
import stafftab from './models/stafftab';
import user from './models/user';
import talk from './models/talk';
import route from './route';
import { createLogger } from 'redux-logger';

// 创建app
const app = dva({
  // onAction: createLogger()
});
// 使用model
app.model(stafftab);
app.model(user);
app.model(talk);

// 使用路由
app.router(route);
// 上树
app.start('#root');
