import React, { Component } from 'react';
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Splash from "../../components/splash/Splash";
import Login from "../users/login/Login";
import Register from "../users/register/Register";

import Account from "../users/account/Account";
import Home from "../home/Home";
import Food from "../pages/food/Food";
import Culture from "../pages/culture/Culture";
import Active from "../pages/active/Active";
import Event from "../pages/event/Event";



class Protected extends Component {
    render(){
        let pathArray = ["/login", "/register", "/"];
        let currentPath = this.props.location.pathname;
        let pathMatch = false;
        for(let i =0; i < pathArray.length; i++){
            if(pathArray[i] === currentPath){
                pathMatch = true
            }
        }
        if(pathMatch){
            return(
                <div>
                    <Route exact path="/" component={Splash}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                </div>
            )
        } else {
            if(this.props.login.length !== 0){   
                return(
                    <div>
                        <Route exact path="/account" component={Account} />
                        <Route exact path="/userHome" component={Home}/>
                        <Route path="/userHome/food" component={Food} />
                        <Route path="/userHome/culture" component={Culture} />
                        <Route path="/userHome/event" component={Event} />
                        <Route path="/userHome/active" component={Active}/>
                    </div>
                )
            } else {
                return(
                    <Redirect to="/"/>
                )
            }
        }
    }
}

function mapStateToProps(state){
    return{
        login : state.login,
    }
}

export default connect(mapStateToProps, null)(Protected);