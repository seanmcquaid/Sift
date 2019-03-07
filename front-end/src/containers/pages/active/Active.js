import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Active extends Component {

    render() {
        return (

            <div>
                <div className="optionsMenuText">
                    <h1>Options Menu</h1>
                </div>
                <div className="optionsCircleContainer">
                    <div>
                        <Link style={{ textDecoration: 'none' }} to="/userHome/active/todo"><div className="toDoCircle"><p>To Do</p></div></Link>
                    </div>
                    <div>
                        <Link style={{ textDecoration: 'none' }} to="/userHome/active/favorites"><div className="favoritesCircle"><p>Favorite</p></div></Link>
                    </div>
                    <div>
                        <Link style={{ textDecoration: 'none' }} to="/userHome/active/reviews"><div className="reviewsCircle"><p>Reviews</p></div></Link>
                    </div>
                    {/* <div>
                            
                        </div> */}
                </div>

            </div>
        )
    }
}


export default Active;

