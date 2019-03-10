import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import "./Login.css";
import loginAction from "../../../actions/loginAction"
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            showAlert : false,
            msg : "",
            email : "",
            password : ""
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.login.msg === "badUser"){
            this.setState({
                msg : "Incorrect email, please try again!",
                showAlert: true
            })
        } else if(newProps.login.msg === "badPassword"){
            this.setState({
                msg : "Incorrect password, please try again!",
                showAlert : true
            })
        } else if (newProps.login.msg === "loginSuccess"){
            this.props.history.push('/userHome');
        }
    }

    inputEmail = (event) =>{
        this.setState({
            email : event.target.value
        })
    }

    inputPassword = (event) =>{
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = (event) =>{
        const userEmail = this.state.email;
        const userPassword= this.state.password;
        event.preventDefault();
        this.props.loginAction({
            userEmail,
            userPassword
        })
    }

    
    render(){
        return(
            <div className="login">
                <div className="login-header-image">
                    <img className="header-image" src="../../../../images/food/bread.jpeg" alt="loginImage"/>
                </div>
                <div className="login-title">
                    <h1 className="title">Login</h1>
                    <p className="instructions">Please enter your email and password below!</p>
                </div>
                <SweetAlert
                        show={this.state.showAlert}
                        title="Whoopsie Daisies"
                        text={this.state.msg}
                        onConfirm={() => this.setState({ showAlert: false })}
                />
                <div className="login-box">
                    <form onSubmit={this.handleLogin} className="login-form">
                        <input onChange={this.inputEmail} id="email-input" type="email" placeholder="Email"/>
                        <input onChange={this.inputPassword} id="password-input" type="password" placeholder="Password"/>
                        <button id="login-button" type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        login: state.login
    }
}


function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        loginAction : loginAction
    }, dispatcher)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);