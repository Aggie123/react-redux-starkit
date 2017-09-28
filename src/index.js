import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './css/normalize.css';
import './css/main.css';

import App from './App';
import EchartsReport from './container/EchartsReport';
import Page1 from './container/Page1';
import Page2 from './container/Page2';
import appReducer from './reducer';

const loggerMiddleware = createLogger();

let store = createStore(
  appReducer,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
  )
);

render(
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <App>
          <Route exact path="/home" component={EchartsReport} />
          <Route exact path="/page1" component={Page1} />
          <Route exact path="/page2" component={Page2} />
        </App>
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);
