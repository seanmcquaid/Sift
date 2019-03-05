import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Layout from "./components/layout/Layout";

import Home from "./containers/home/Home"

import Splash from "./components/splash/Splash";
import Login from "./containers/users/login/Login";
import FoodTodo from "./containers/pages/food/todo/FoodTodo";
import Register from "./containers/users/register/Register";


class App extends Component {
  render() {
    return (
      <Router>
         <Layout>

          <Route exact path="/" component={Splash}/>
          <Route exact path="/login" component={Login}/>

          <Route exact path="/userHome" component={Home}/>
          {/* <Route exact path="/food" component={Food} /> */}
          <Route exact path="/food/todo" component={FoodTodo} />
          <Route exact path="/register" component={Register}/>

        </Layout>
      </Router>
    );
  }
}

export default App;
