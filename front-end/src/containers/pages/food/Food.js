import React, {Component} from 'react';
import { Route } from "react-router-dom";

import FoodTodo from "./todo/FoodTodo";
import FoodFavorites from './favorites/FoodFavorites'
import FoodReviews from "./reviews/FoodReviews";
import FoodExplore from "./explore/FoodExplore";
import EditForm from '../../Forms/EditForm';
import FaveReviewForm from '../../Forms/FaveReviewForm'

import CategoryHomeLayout from '../CategoryHomeLayout'
import '../categoryHome.css';

class Food extends Component {

    render(){
        return(
            <CategoryHomeLayout>
                <Route exact path="/userHome/food/" component={FoodExplore} />
                <Route exact path="/userHome/food/todo" component={FoodTodo} />
                <Route exact path="/userHome/food/favorites" component={FoodFavorites} />
                <Route exact path="/userHome/food/reviews" component={FoodReviews} />
                <Route exact path="/userHome/:category/edit/:section/:place" component={EditForm} />
                <Route exact path="/userHome/:category/reviews/:section/:place" component={FaveReviewForm} />
            </CategoryHomeLayout>
        )
    }
}


export default Food;



