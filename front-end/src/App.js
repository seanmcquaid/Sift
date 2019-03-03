import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path="/" component={Splash}/>
      </Layout>
    );
  }
}

export default App;
