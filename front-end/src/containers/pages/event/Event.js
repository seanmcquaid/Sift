import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "../categoryHome.css";

class Event extends Component {

    render(){
        return(

            <div className="optionsMenu">
                 <div className="optionsMenuText">
                    <h1>Event Options Menu</h1>
                </div>
                <div className="optionsCircleContainer">
                        <div>
                            <Link style={{ textDecoration: 'none' }} to="/userHome/event/todo"><div className="toDoCircle"><p>To Do</p></div></Link>
                        </div>
                        <div>    
                            <Link style={{ textDecoration: 'none' }} to="/userHome/event/favorites"><div className="favoritesCircle"><p>Favorite</p></div></Link>
                        </div>
                        <div>
                            <Link style={{ textDecoration: 'none' }} to="/userHome/event/reviews"><div className="reviewsCircle"><p>Reviews</p></div></Link>
                        </div>
                        {/* <div>
                            
                        </div> */}
                </div>

            </div>
        )
    }
}


export default Event;