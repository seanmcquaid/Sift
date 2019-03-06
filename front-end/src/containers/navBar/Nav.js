import React, {Component} from "react";
import "./Nav.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Nav extends Component{
    // need logic to see if logged in, change route on left to user home
    // and on right, display categories and hamburger with profile/logout
    render(){
        return(
            <div className="nav">
                <div className="logo">Logo Placeholder</div>
                <div className="login-register">
                    <div className="login-link"><Link to="/login">Login</Link></div>
                    <div className="register-link"><Link to="/register">Register</Link></div>
                </div>
            </div>
        )
    }
}

// mapstate to props to find out login status

export default Nav;