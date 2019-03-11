import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import FoodTodo from "./todo/FoodTodo";
import FoodFavorites from './favorites/FoodFavorites'
import FoodReviews from "./reviews/FoodReviews";
import FoodExplore from "./explore/FoodExplore";
import EditForm from '../../Forms/EditForm';
import FaveReviewForm from '../../Forms/FaveReviewForm'

import CategoryHomeLayout from '../CategoryHomeLayout'
import '../categoryHome.css'
import EditForm from '../../Forms/EditForm';
import FaveReviewForm from '../../Forms/FaveReviewForm';
import EventFaveReviewForm from '../../Forms/EventFaveReviewForm';

class Food extends Component {

    render(){
        return(
            <Router>
                <CategoryHomeLayout>
                    <Route exact path="/userHome/food/" component={FoodExplore} />
                    <Route exact path="/userHome/food/todo" component={FoodTodo} />
                    <Route exact path="/userHome/food/favorites" component={FoodFavorites} />
                    <Route exact path="/userHome/food/reviews" component={FoodReviews} />
                    <Route exact path="/userHome/:category/edit/:section/:place" component={EditForm} />
                    <Route exact path="/userHome/:category/reviews/:section/:place" component={FaveReviewForm} />
                </CategoryHomeLayout>
            </Router>
        )
    }
}


export default Food;



