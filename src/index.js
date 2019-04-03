
// document.getElementById("app").innerHTML = "hello webpack";

// var func = str => {
//   document.getElementById('app').innerHTML = str;
// };
// func('我现在在使用Babel!');

import React from 'react';
import ReactDom from 'react-dom';
import Hello from './commons/components/Hello';

import {AppContainer} from 'react-hot-loader';  //热更新  模块

import AsyncComponent from './commons/utils/AsyncComponent' //分割代码， 按页面模块 加载

import Routers from './router/router'

import {registerSw, unregisterSw} from './core/registerSw'

// //renderWithHotReload(Routers);
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }

if (module.hot) {
  // module.hot.accept(); //这事原始的 特更新， 下面要加上 react状态 保持的 热更新

  module.hot.accept('./router/router', () => {
    const Routers = require('./router/router').default;
    ReactDom.render(
      <AppContainer>
        <Routers/>
      </AppContainer>, document.getElementById('app')
  );
});
}

ReactDom.render(
  <AppContainer>
  <Routers/>
</AppContainer>, document.getElementById('app')
  );
  
  registerSw();