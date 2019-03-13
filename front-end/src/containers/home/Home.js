import React, {Component} from 'react';
import './Home.css'
import {Link, Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import setCategory from '../../actions/setCategory'


class Home extends Component{


    setCategory = (event, cat) => {
        this.props.setCategory(cat)
    }

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
                            <Link style={{ textDecoration: 'none' }} onClick={(event)=>{this.setCategory(event,'food')}} to="/userHome/food"><div className="food"><p>Food</p></div></Link>
                            <Link style={{ textDecoration: 'none' }} onClick={(event)=>{this.setCategory(event, 'active')}} to="/userHome/active"><div className="active"><p>Active</p></div></Link>
                            </div>
                            <div>
                            <Link style={{ textDecoration: 'none' }} onClick={(event)=>{this.setCategory(event,'culture')}} to="/userHome/culture"><div className="culture"><p>Culture</p></div></Link>
                            <Link style={{ textDecoration: 'none' }} onClick={(event)=>{this.setCategory(event,'event')}} to="/userHome/event"><div className="events"><p>Events</p></div></Link>
                            </div>
                    </div>
                </div>
                )
            }
        }
    }

function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        setCategory: setCategory
    }, dispatcher)
}

function mapStateToProps(state) {
    return {
        login: state.login,
        category: state.category
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);