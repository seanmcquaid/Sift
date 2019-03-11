import React, {Component} from "react";
import {connect} from "react-redux";
import axios from 'axios';
import "./Account.css";

import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';


class Account extends Component {
    constructor(){
        super()
        this.state = {
            showAlert : false,
            msg : "",
            alertTitle: "",
            email:'',
            password : "",
            testPassword : ""
        }
    }


    inputPassword = (event) =>{
        this.setState({
            password: event.target.value
        })
    }

    inputTestPassword = (event) =>{
        this.setState({
            testPassword : event.target.value
        })
    }

    handleRegister = (event)=>{
        const userPassword= this.state.password;
        const testPassword = this.state.testPassword;
        event.preventDefault();
        if(userPassword !== testPassword){
            this.setState({
                alertTitle: "Whoopsie Daisies",
                msg : "Your passwords don't match, please try again",
                showAlert: true
            })
        } else {
                event.preventDefault();
                axios({
                    method: 'POST',
                    url: `${window.apiHost}/users/account`,
                    data: {
                        email: this.props.login.email,
                        password:this.state.password
                    }
                }).then(() => {
                    this.setState({
                        msg : "Password changed",
                        alertTitle: "Hurray!",
                        showAlert: true
                    })
                })
        }
    }


    render(){
        return(
            <div className="register">
                <div className="register-header-image">
                    <img className="header-image" src="../../../../images/food/croissant.jpeg" alt="registerImage"/>
                </div>
                <div className="register-title">
                    <h1 className="title">Account</h1>
                    <p className="instructions">Reset password must be 6 characters with at least one number!</p>
                </div>
                <SweetAlert
                    show={this.state.showAlert}
                    title={this.state.alertTitle}
                    text={this.state.msg}
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                <div className="register-box">
                    <form onSubmit={this.handleRegister} className="register-form">
                        <input onChange={this.inputPassword} id="password-input" type="password" placeholder="Password"/>
                        <input onChange={this.inputTestPassword} id="password-input" type="password" placeholder="Re-type password"/>
                        <button id="register-button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        login : state.login
    }
}


export default connect(mapStateToProps, null)(Account);