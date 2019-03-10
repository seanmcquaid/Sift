import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "../categoryHome.css";

class Culture extends Component {

    render(){
        return(
            <div className="optionsMenu">
                 <div className="optionsMenuText">
                    <h1>Culture Options Menu</h1>
                </div>
                <div className="optionsCircleContainer">
                        <div>
                            <Link style={{ textDecoration: 'none' }} to="/userHome/culture/todo"><div className="toDoCircle"><p>To Do</p></div></Link>
                        </div>
                        <div>    
                            <Link style={{ textDecoration: 'none' }} to="/userHome/culture/favorites"><div className="favoritesCircle"><p>Favorite</p></div></Link>
                        </div>
                        <div>
                            <Link style={{ textDecoration: 'none' }} to="/userHome/culture/reviews"><div className="reviewsCircle"><p>Reviews</p></div></Link>
                        </div>
                </div>
            </div>
        )
    }
}


export default Culture;