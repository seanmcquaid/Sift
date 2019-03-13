import React, { Component } from 'react';
import {Route } from "react-router-dom";

import CategoryHomeLayout from '../CategoryHomeLayout';
import ActiveTodo from './todo/ActiveTodo';
import ActiveFavorites from './favorites/ActiveFavorites';
import ActiveReviews from './reviews/ActiveReviews';
import EditForm from '../../Forms/EditForm';
import FaveReviewForm from '../../Forms/FaveReviewForm'

import "../categoryHome.css";
import ActiveExplore from './explore/ActiveExplore';


class Active extends Component {

    render() {
        return (
            <CategoryHomeLayout>
                <Route exact path="/userHome/active" component={ActiveExplore} />
                <Route exact path="/userHome/active/todo" component={ActiveTodo} />
                <Route exact path="/userHome/active/favorites" component={ActiveFavorites} />
                <Route exact path="/userHome/active/reviews" component={ActiveReviews} />
                <Route exact path="/userHome/:category/edit/:section/:place" component={EditForm} />
                <Route exact path="/userHome/:category/reviews/:section/:place" component={FaveReviewForm} />
            </CategoryHomeLayout>
        )
    }
}


export default Active;

