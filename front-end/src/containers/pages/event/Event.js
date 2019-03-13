import React, { Component } from 'react';
import { Route } from "react-router-dom";

import CategoryHomeLayout from '../CategoryHomeLayout';
import EventTodo from './todo/EventTodo';
import EventFavorites from './favorites/EventFavorites';
import EventReviews from './reviews/EventReviews';
import EditForm from '../../Forms/EditForm';
import FaveReviewForm from '../../Forms/FaveReviewForm';
import EventFaveReviewForm from '../../Forms/EventFaveReviewForm';

import "../categoryHome.css";
import EventExplore from './explore/EventExplore';


class Event extends Component {

    render() {
        return (
            <CategoryHomeLayout>
                <Route exact path="/userHome/event" component={EventExplore} />
                <Route exact path="/userHome/event/todo" component={EventTodo} />
                <Route exact path="/userHome/event/favorites" component={EventFavorites} />
                <Route exact path="/userHome/event/reviews" component={EventReviews} />
                <Route exact path="/userHome/:category/edit/:section/:place" component={EditForm} />
                <Route exact path="/userHome/:category/reviews/:section/:place" component={FaveReviewForm} />
                <Route exact path="/userHome/:category/eventReviews/:section/:place" component={EventFaveReviewForm} />
            </CategoryHomeLayout>
        )
    }
}



export default Event;