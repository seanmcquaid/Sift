import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import './SideNav.css';

class SideNav extends Component {

    render() {
        let catHome = `/userHome/${this.props.category}`
        let todoLink = `/userHome/${this.props.category}/todo`
        let faveLink = `/userHome/${this.props.category}/favorites`
        let reviewsLink = `/userHome/${this.props.category}/reviews`
        
        return (
            <div className="sideNav">
                <div className="circleContainer">
                    <div>
                        <Link style={{ textDecoration: 'none' }} to={catHome}><div className="exploreCircle"><p>Explore</p></div></Link>
                    </div>
                    <div>
                        <Link style={{ textDecoration: 'none' }} to={todoLink}><div className="toDoCircle"><p>To Do</p></div></Link>
                    </div>
                    <div>
                        <Link style={{ textDecoration: 'none' }} to={faveLink}><div className="favoritesCircle"><p>Favorite</p></div></Link>
                    </div>
                    <div>
                        <Link style={{ textDecoration: 'none' }} to={reviewsLink}><div className="reviewsCircle"><p>Reviews</p></div></Link>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        category: state.category
    }
}

export default connect(mapStateToProps, null)(SideNav);