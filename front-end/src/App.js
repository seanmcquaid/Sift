import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Layout from "./components/layout/Layout";

import Home from "./containers/home/Home"

import Splash from "./components/splash/Splash";
import Login from "./containers/users/login/Login";
import Register from "./containers/users/register/Register";

import Food from "./containers/pages/food/Food";
import FoodTodo from "./containers/pages/food/todo/FoodTodo";
import FoodFavorites from './containers/pages/food/favorites/FoodFavorites'
import FoodReviews from "./containers/pages/food/reviews/FoodReviews"



class App extends Component {
  render() {
    return (
      <Router>
         <Layout>

          <Route exact path="/" component={Splash}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/userHome" component={Home}/>
          <Route exact path="/userHome/food" component={Food} />
          <Route exact path="/userHome/food/todo" component={FoodTodo}/>
          <Route exact path="/userHome/food/favorites" component={FoodFavorites}/>
          <Route exact path="/userHome/food/reviews" component={FoodReviews}/>

          <Route exact path="/userHome/event" component={Event} />
          <Route exact path="/userHome/event/todo" component={EventTodo}/>
          <Route exact path="/userHome/event/favorites" component={EVentFavorites}/>
          <Route exact path="/userHome/event/reviews" component={EventReviews}/>


          <Route exact path="/userHome/active/todo" component={ActiveTodo} />
          <Route exact path="/userHome/active/favorites" component={ActiveFavorites} />
          <Route exact path="/userHome/active/reviews" component={ActiveReviews} />

          <Route exact path="/register" component={Register}/>

        </Layout>
      </Router>
    );
  }
}

export default App;
