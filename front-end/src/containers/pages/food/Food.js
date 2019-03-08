import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Food extends Component {

    render(){
        return(

            <div>
                 <div className="optionsMenuText">
                    <h1>Food Options Menu</h1>
                </div>
                <div className="optionsCircleContainer">
                        <div>
                            <Link style={{ textDecoration: 'none' }} to="/userHome/food/todo"><div className="toDoCircle"><p>To Do</p></div></Link>
                        </div>
                        <div>    
                            <Link style={{ textDecoration: 'none' }} to="/userHome/food/favorites"><div className="favoritesCircle"><p>Favorite</p></div></Link>
                        </div>
                        <div>
                            <Link style={{ textDecoration: 'none' }} to="/userHome/food/reviews"><div className="reviewsCircle"><p>Reviews</p></div></Link>
                        </div>
                </div>

            </div>
        )
    }
}


export default Food;



