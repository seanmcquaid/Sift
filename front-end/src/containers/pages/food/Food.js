import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Food extends Component {

    render(){
        return(
            <div className="FoodHome">
                <Link to="/userHome/food/todo">To Do</Link>
                <Link to="/userHome/food/favorites">Favorites</Link>
                <Link to="/userHome/food/reviews">Reviews</Link>
            </div>
        )
    }
}

export default Food;



