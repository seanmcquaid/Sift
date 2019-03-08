import React from 'react';
import './Home.css'
import {Link} from 'react-router-dom';


function Home(props){
    const number = (Math.floor(Math.random() * 5) + 1)
    const chooseMessage = number
    let welcomeMessage

    if (chooseMessage === 1){
        welcomeMessage = "Let's Get It"
    } else if (chooseMessage === 2){
        welcomeMessage = "Welcome Back"
    } else if (chooseMessage === 3){
        welcomeMessage = "Carp Diem"
    } else if (chooseMessage === 4){
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
    
    export default Home;