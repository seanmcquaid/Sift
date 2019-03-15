import React, {Component} from "react";
import "./Nav.css";
import {Link, Redirect} from "react-router-dom";
import logoutAction from "../../actions/logoutAction"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import setCategory from '../../actions/setCategory';

class Nav extends Component{
    // need logic to see if logged in, change route on left to user home
    // and on right, display categories and hamburger with profile/logout

    navRightLoginToggle = (event, cat)=>{
        event.preventDefault();
        this.props.setCategory(cat)
        if(document.querySelector(".nav-right-dropdown").style.display === "none"){
            document.querySelector(".nav-right-dropdown").style.display = "inline";
        } else {
            document.querySelector(".nav-right-dropdown").style.display = "none";
        }
    }

    navRightLoggedInToggle = (event, cat)=>{
        event.preventDefault();
        this.props.setCategory(cat)
        if(document.querySelector(".nav-right-dropdown-logged-in").style.display === "none"){
            document.querySelector(".nav-right-dropdown-logged-in").style.display = "inline";
        } else {
            document.querySelector(".nav-right-dropdown-logged-in").style.display = "none";
        }
    }

    handleLogout = (event)=>{
        event.preventDefault();
        this.props.logoutAction();
        if(document.querySelector(".nav-right-dropdown-logged-in").style.display === "none"){
            document.querySelector(".nav-right-dropdown-logged-in").style.display = "inline";
        } else {
            document.querySelector(".nav-right-dropdown-logged-in").style.display = "none";
        }
        return(
            <Redirect to="/"/>
        )
    }
    
    render(){
        let navLeft;
        let navRight;
        if(this.props.login.length === 0 || this.props.login.msg === "badUser"){
            navLeft = <div className="logo"><Link to="/"><img className="logoImg" src='../../../../images/logo/logoDarkGray.png' alt='logo'/></Link></div>;
            navRight = <div className="nav-right-login">
                            <div className="nav-right-login-links">
                                <div className="login-link"><Link to="/login">Login</Link></div>
                                <div className="register-link"><Link to="/register">Register</Link></div>
                            </div>
                            <div className="nav-toggle-icon-login" onClick={(event)=>{this.navRightLoginToggle(event, 'none')}}>
                                <i className="fas fa-bars"></i>
                            </div>
                            <div className="nav-right-dropdown">
                                <div className="nav-right-dropdown-link" onClick={(event)=>{this.navRightLoginToggle(event, 'none')}}><Link to="/login">Login</Link></div>
                                <div className="nav-right-dropdown-link" onClick={(event)=>{this.navRightLoginToggle(event, 'none')}}><Link to="/register">Register</Link></div>
                            </div>
                        </div>;
            
        } else {
            navLeft = <div className="logo"><Link to="/userHome"><img className="logoImg" src='../../../../images/logo/logoDarkGray.png' alt='logo'/></Link></div>;
            navRight = <div className="nav-right">
                            <div className="nav-right-links">
                                <div className="category-link"><Link onClick={()=>{this.props.setCategory('food')}} to="/userHome/food">Food</Link></div>
                                <div className="category-link"><Link onClick={()=>{this.props.setCategory('active')}}  to="/userHome/active">Active</Link></div>
                                <div className="category-link"><Link onClick={()=>{this.props.setCategory('culture')}}  to="/userHome/culture">Culture</Link></div>
                                <div className="category-link"><Link onClick={()=>{this.props.setCategory('event')}}  to="/userHome/event">Events</Link></div>
                            </div>
                            <div className="nav-toggle-icon" onClick={(event)=>{this.navRightLoggedInToggle(event, 'none')}}>
                                <i className="fas fa-bars"></i>
                            </div>
                            <div className="nav-right-dropdown-logged-in">
                                <div className="nav-right-dropdown-link" onClick={(event) => {this.navRightLoggedInToggle(event, 'none')}}><Link to="/account">Account</Link></div>
                                <div className="nav-right-dropdown-link nav-logout" onClick={this.handleLogout}>Log Out</div>
                                <div className="nav-right-dropdown-link nav-category" onClick={(event)=>{this.navRightLoggedInToggle(event, 'food')}}><Link to="/userHome/food">Food</Link></div>
                                <div className="nav-right-dropdown-link nav-category" onClick={(event)=>{this.navRightLoggedInToggle(event, 'active')}}><Link to="/userHome/active">Active</Link></div>
                                <div className="nav-right-dropdown-link nav-category" onClick={(event)=>{this.navRightLoggedInToggle(event, 'culture')}}><Link to="/userHome/culture">Culture</Link></div>
                                <div className="nav-right-dropdown-link nav-category" onClick={(event)=>{this.navRightLoggedInToggle(event, 'event')}}><Link to="/userHome/event">Events</Link></div>
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
        login : state.login,
    }
}

function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        logoutAction : logoutAction,
        setCategory : setCategory
    }, dispatcher)
}

export default connect(mapStateToProps,mapDispatchToProps)(Nav);