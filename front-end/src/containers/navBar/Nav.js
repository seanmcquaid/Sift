import React, {Component} from "react";
import "./Nav.css";
import {Link} from "react-router-dom";

class Nav extends Component{
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

export default Nav;