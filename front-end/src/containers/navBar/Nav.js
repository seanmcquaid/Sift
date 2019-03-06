import React, {Component} from "react";
import "./Nav.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Nav extends Component{
    // need logic to see if logged in, change route on left to user home
    // and on right, display categories and hamburger with profile/logout
    
    render(){
        let navLeft;
        let navRight;
        if(this.props.login.length === 0){
            navLeft = <div className="logo"><Link to="/">Logo Placeholder</Link></div>;
            navRight = <div className="nav-right">
                            <div className="login-link"><Link to="/login">Login</Link></div>
                            <div className="register-link"><Link to="/register">Register</Link></div>
                        </div>;
            
        } else {
            navLeft = <div className="logo"><Link to="/userHome">Logo Placeholder</Link></div>;
            navRight = <div className="nav-right">
                            <div className="category-link"><Link to="/food">Food</Link></div>
                            <div className="category-link"><Link to="/">Active</Link></div>
                            <div className="category-link"><Link to="/">Culture</Link></div>
                            <div className="category-link"><Link to="/">Outdoor</Link></div>
                            <div className="nav-toggle-icon">
                                <i className="fas fa-bars"></i>
                            </div>
                        </div>;
        }
        return(
            <div className="nav">
                {navLeft}
                {navRight}
            </div>
        )
    }
}

// mapstate to props to find out login status

function mapStateToProps(state){
    return{
        login : state.login
    }
}

export default connect(mapStateToProps, null)(Nav);