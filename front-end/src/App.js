import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Layout from "./components/layout/Layout";

import Home from "./containers/home/Home"

import Splash from "./components/splash/Splash";
import Login from "./containers/users/login/Login";
import Register from "./containers/users/register/Register";
import Account from "./containers/users/account/Account";

// import FoodExplore from "./containers/pages/food/explore/FoodExplore";
// import EditForm from "./containers/Forms/EditForm";

import Food from "./containers/pages/food/Food";
// import FoodTodo from "./containers/pages/food/todo/FoodTodo";
// import FaveReviewForm from './containers/Forms/FaveReviewForm'
// import FoodFavorites from './containers/pages/food/favorites/FoodFavorites'
// import FoodReviews from "./containers/pages/food/reviews/FoodReviews";

import Culture from './containers/pages/culture/Culture';
// import CultureTodo from './containers/pages/culture/todo/CultureTodo';
// import CultureFavorites from './containers/pages/culture/favorites/CultureFavorites';
// import CultureReviews from './containers/pages/culture/reviews/CultureReviews';

import Event from "./containers/pages/event/Event";
// import EventTodo from './containers/pages/event/todo/EventTodo';
// import EventFavorites from './containers/pages/event/favorites/EventFavorites';
// import EventReviews from './containers/pages/event/reviews/EventReviews';
// import EventFaveReviewForm from './containers/Forms/EventFaveReviewForm'

import Active from "./containers/pages/active/Active";
// import ActiveTodo from "./containers/pages/active/todo/ActiveTodo";
// import ActiveFavorites from "./containers/pages/active/favorites/ActiveFavorites";
// import ActiveReviews from "./containers/pages/active/reviews/ActiveReviews";

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
          
          <Route exact path="/userHome/food" component={Food} />
          {/* <Route exact path="/userHome/food/todo" component={FoodTodo}/>
          <Route exact path="/userHome/food/favorites" component={FoodFavorites}/>
          <Route exact path="/userHome/food/reviews" component={FoodReviews}/>
          <Route exact path="/userHome/food/explore" component={FoodExplore}/> */}
      
          <Route exact path="/userHome/culture" component={Culture} />
          {/* <Route exact path="/userHome/culture/todo" component={CultureTodo}/>
          <Route exact path="/userHome/culture/favorites" component={CultureFavorites}/>
          <Route exact path="/userHome/culture/reviews" component={CultureReviews}/> */}
          
          <Route exact path="/userHome/event" component={Event} />
          {/* <Route exact path="/userHome/event/todo" component={EventTodo}/>
          <Route exact path="/userHome/event/favorites" component={EventFavorites}/>
          <Route exact path="/userHome/event/reviews" component={EventReviews}/> */}

          <Route exact path="/userHome/active" component={Active}/>
          {/* <Route exact path="/userHome/active/todo" component={ActiveTodo} />
          <Route exact path="/userHome/active/favorites" component={ActiveFavorites} />
          <Route exact path="/userHome/active/reviews" component={ActiveReviews} /> */}

          {/* <Route exact path="/userHome/:category/edit/:section/:place" component={EditForm} />
          <Route exact path="/userHome/:category/reviews/:section/:place" component={FaveReviewForm} />
          <Route exact path="/userHome/:category/eventReviews/:section/:place" component={EventFaveReviewForm} /> */}

        </Layout>
      </Router>
    );
  }
}

export default App;
