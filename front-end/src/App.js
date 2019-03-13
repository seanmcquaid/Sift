import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Layout from "./components/layout/Layout";

import Home from "./containers/home/Home"

import Splash from "./components/splash/Splash";
import Login from "./containers/users/login/Login";
import Register from "./containers/users/register/Register";
import Account from "./containers/users/account/Account";
import Food from "./containers/pages/food/Food";
import Culture from './containers/pages/culture/Culture';
import Event from "./containers/pages/event/Event";
import Active from "./containers/pages/active/Active";

class App extends Component {
  render() {
    return (
      <Router>
         <Layout>
           
          <Route exact path="/" component={Splash}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/account" component={Account} />

          <Route exact path="/userHome" component={Home}/>
          <Route path="/userHome/food" component={Food} />
          <Route path="/userHome/culture" component={Culture} />
          <Route path="/userHome/event" component={Event} />
          <Route path="/userHome/active" component={Active}/>

        </Layout>
      </Router>
    );
  }
}

export default App;
