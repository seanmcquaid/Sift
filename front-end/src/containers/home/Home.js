import React from 'react';
import './Home.css'
import {Link} from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css'


function Home(props){
    const number = (Math.floor(Math.random() * 5) + 1)
    const chooseMessage = number
    let welcomeMessage

    if (chooseMessage == 1){
        welcomeMessage = "Let's Get It"
    } else if (chooseMessage == 2){
        welcomeMessage = "Welcome Back"
    } else if (chooseMessage == 3){
        welcomeMessage = "Carp Diem"
    } else if (chooseMessage == 4){
        welcomeMessage = "Holla"
    } else {
        welcomeMessage = "Nice to See You"
    } 

    return(
        <div>
            <div className="welcomeTextContent">
                <h1>{welcomeMessage}</h1>
            </div>
            <div className="categoryCircleContainer">
                    <div className="circleSpacing">
                    <Link to="/userHome/food"><div className="food"><p>Food</p></div></Link>
                        <div className="active"><p>Active</p></div>
                    </div>
                    <div>
                        <div className="culture"><p>Culture</p></div>
                        <div className="events"><p>Events</p></div>
                    </div>
            </div>
        </div>
        )
    }
    
    export default Home;