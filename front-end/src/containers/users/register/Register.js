import React, {Component} from "react";
import "./Register.css";

class Register extends Component {
    render(){
        return(
            <div className="register">
                <div className="register-header-image">
                    <img className="header-image" src="../../../../images/food/bread.jpeg"/>
                </div>
                <div className="register-title">
                    <h1 className="title">Register</h1>
                    <p className="instructions">Your password must be 6 characters with at least one number!</p>
                </div>
                <div className="register-box">
                    <form className="register-form">
                        <input id="email-input" type="text" placeholder="Email"/>
                        <input id="password-input" type="text" placeholder="Password"/>
                        <input id="password-input" type="text" placeholder="Re-type password"/>
                        <button id="register-button" type="submit">Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;