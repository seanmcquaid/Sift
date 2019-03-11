import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import CategoryHomeLayout from '../CategoryHomeLayout';
import CultureTodo from './todo/CultureTodo';
import CultureFavorites from './favorites/CultureFavorites';
import CultureReviews from './reviews/CultureReviews';
import EditForm from '../../Forms/EditForm';
import FaveReviewForm from '../../Forms/FaveReviewForm'

import "../categoryHome.css";

class Culture extends Component {

    render(){
        return(
            <Router>
                <CategoryHomeLayout>
                    {/* <Route exact path="/userHome/culture" component={CultureExplore} /> */}
                    <Route exact path="/userHome/culture/todo" component={CultureTodo} />
                    <Route exact path="/userHome/culture/favorites" component={CultureFavorites} />
                    <Route exact path="/userHome/culture/reviews" component={CultureReviews} />
                    <Route exact path="/userHome/:category/edit/:section/:place" component={EditForm} />
                    <Route exact path="/userHome/:category/reviews/:section/:place" component={FaveReviewForm} />
                </CategoryHomeLayout>
            </Router>
        )
    }
}


export default Culture;