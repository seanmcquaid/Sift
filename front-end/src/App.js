import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Layout from "./components/layout/Layout";
import Protected from './containers/Protected/Protected';

class App extends Component {
  render() {
    return (
      <Router>
         <Layout>
           
         <Route path = "/" component={Protected}/>



        </Layout>
      </Router>
    );
  }
}

export default App;
