import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import FoodTodo from "./todo/FoodTodo";
import FoodFavorites from './favorites/FoodFavorites'
import FoodReviews from "./reviews/FoodReviews";
import FoodExplore from "./explore/FoodExplore";

import CategoryHomeLayout from '../CategoryHomeLayout'
import '../categoryHome.css'

class Food extends Component {

    render(){
        return(
            <Router>
                <CategoryHomeLayout>
                    <Route exact path="/userHome/food/" component={FoodExplore} />
                    <Route exact path="/userHome/food/todo" component={FoodTodo} />
                    <Route exact path="/userHome/food/favorites" component={FoodFavorites} />
                    <Route exact path="/userHome/food/reviews" component={FoodReviews} />
                </CategoryHomeLayout>
            </Router>
        )
    }
}


export default Food;



