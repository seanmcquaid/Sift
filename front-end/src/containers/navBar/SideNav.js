import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './SideNav.css';

class SideNav extends Component {

    render() {
        return (

            <div className="sideNav">
                {/* <div className="sideNavText">
                    <h1>Yummy treats!</h1>
                </div> */}
                <div className="circleContainer">
                    <div>
                        <Link style={{ textDecoration: 'none' }} to="/userHome/food/"><div className="exploreCircle"><p>Explore</p></div></Link>
                    </div>
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


export default SideNav;