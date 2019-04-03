import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

//import Hello from '../commons/components/Hello/Hello'
//import Home from '../pages/Home/index.jsx' 
//在默认情况下，path 只能默认到 index.js 所以，如果不是，就要把jsx文件写全

//import Home from '../pages/Home' 
import Page1 from '../pages/Page1';

import asyncComponent from '../commons/utils/AsyncComponent' //分割代码， 按页面模块 加载

const Hello = asyncComponent(() => import(/* webpackChunkName: "Hello" */ "../commons/components/Hello"));
const Home = asyncComponent(() => import(/* webpackChunkName: "Hello" */ "../pages/Home"));

export default class Routers extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Hello}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/page' component={Page1}></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}
