import React, { Component } from 'react';
import './App.css';

import Layout from "./components/layout/Layout";

import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
         <Layout>
          {/* <Route exact path="/" component={Splash}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/userHome" component={Home}/> */}
        </Layout>
      </Router>
    );
  }
}

export default App;
