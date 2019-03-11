import React, {Component} from 'react';
import './Home.css'
import {Link, Redirect} from 'react-router-dom';
import { connect } from "react-redux";


class Home extends Component{
    render(){
        const number = (Math.floor(Math.random() * 5) + 1)
    const chooseMessage = number
    let welcomeMessage

    if (chooseMessage === 1){
        welcomeMessage = "Let's Get It!"
    } else if (chooseMessage === 2){
        welcomeMessage = "Welcome Back!"
    } else if (chooseMessage === 3){
        welcomeMessage = "Carpé Diem!"
    } else if (chooseMessage === 4){
        welcomeMessage = "Hello hello!"
    } else {
        welcomeMessage = "Nice to See You!"
    } 
    
    if(this.props.login.length === 0){
        return(
        <Redirect to="/login"/>
        )
    } else {
        return(
            <div>
                <div className="welcomeTextContent">
                    <h1 className="welcomeMessage">{welcomeMessage}</h1>
                </div>
                <div className="categoryCircleContainer">
                        <div className="circleSpacing">
                            <Link style={{ textDecoration: 'none' }} to="/userHome/food"><div className="food"><p>Food</p></div></Link>
                            <Link style={{ textDecoration: 'none' }} to="/userHome/active"><div className="active"><p>Active</p></div></Link>
                        </div>
                        <div>
                            <Link style={{ textDecoration: 'none' }} to="/userHome/culture"><div className="culture"><p>Culture</p></div></Link>
                            <Link style={{ textDecoration: 'none' }} to="/userHome/event"><div className="events"><p>Events</p></div></Link>
                        </div>
                </div>
            </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps, null)(Home);