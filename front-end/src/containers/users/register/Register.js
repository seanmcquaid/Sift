import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import "./Register.css";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import regAction from "../../../actions/regAction"

class Register extends Component {
    constructor(){
        super()
        this.state = {
            showAlert : false,
            msg : "",
            email : "",
            password : "",
            testPassword : ""
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.login.msg === "userAdded"){
            this.props.history.push('/userHome');
        } else if(newProps.login.msg === "userExists"){
            this.setState({
                msg : "This user already exists, please try again!",
                showAlert: true
            })
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

    inputTestPassword = (event) =>{
        this.setState({
            testPassword : event.target.value
        })
    }

    handleRegister = (event)=>{
        const userEmail = this.state.email;
        const userPassword= this.state.password;
        const testPassword = this.state.testPassword;
        event.preventDefault();
        if(userPassword !== testPassword){
            this.setState({
                msg : "Your passwords don't match, please try again",
                showAlert: true
            })
        } else {
            this.props.regAction({
                userEmail,
                userPassword
            })
        }
    }


    render(){
        return(
            <div className="register">
                <div className="register-header-image">
                    <img className="header-image" src="../../../../images/food/bread.jpeg" alt="registerImage"/>
                </div>
                <div className="register-title">
                    <h1 className="title">Register</h1>
                    <p className="instructions">Your password must be 6 characters with at least one number!</p>
                </div>
                <SweetAlert
                    show={this.state.showAlert}
                    title="Whoopsie Daisies"
                    text={this.state.msg}
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                <div className="register-box">
                    <form onSubmit={this.handleRegister} className="register-form">
                        <input onChange={this.inputEmail} id="email-input" type="email" placeholder="Email"/>
                        <input onChange={this.inputPassword} id="password-input" type="password" placeholder="Password"/>
                        <input onChange={this.inputTestPassword} id="password-input" type="password" placeholder="Re-type password"/>
                        <button id="register-button" type="submit">Register</button>
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

function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        regAction : regAction
    },dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);