import React, {Component} from "react";
import "./Login.css";

class Login extends Component {
    render(){
        return(
            <div className="login">
                <div className="login-header-image">
                    <img className="header-image" src="../../../../images/food/bread.jpeg"/>
                </div>
                <div className="login-title">
                    <h1>Login</h1>
                </div>
                <div className="login-box">
                    <form className="login-form">
                        <input id="email-input" type="text" placeholder="Email here"/>
                        <input id="password-input" type="text" placeholder="Password here"/>
                        <button id="login-button" type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;