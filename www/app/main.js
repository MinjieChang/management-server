import React from 'react';
import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';
import 'babel-polyfill';
import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import { message } from 'antd';
import 'antd/dist/antd.css';
import createLoading from 'dva-loading';
import { createLogger } from 'redux-logger';
import stafftab from './models/stafftab';
import user from './models/user';
import talk from './models/talk';
import route from './route';

// 创建app
const app = dva({
  // onAction: createLogger(),
  history: createHistory(),
  onError: error => message.error(error.message, 2),
});

app.use(createLoading());

app.model(stafftab);
app.model(user);
app.model(talk);

app.router(route);
// app.start('#root');

const App = app.start();

const renderDom = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

renderDom(App);

if (module.hot && process.env.NODE_ENV === 'development') {
  // module.hot.accept('./containers/Layout.js', () => {
  //   console.log(88888);
  //   const AppS = app.start();
  //   renderDom(AppS);
  // });
  module.hot.accept();
}
