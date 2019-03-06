import React from 'react';
import './Splash.css'
import Carousel from './Carousel';
import {Link} from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css'

function Splash(props){

    return(
        <div>
            <div>
                <Carousel/>
            </div>
            <div className="splashTextContent">
                <h1>What Is Sift?</h1>
                <p>Sift is an application that allows users to create lists 
                    of places they'd like to visit or activities they'd like to try.
                    Our goal is to simplify and streamline all of the ways in which 
                    you can explore the world around you.
                </p>
                <h1>How Does It Work?</h1>
                <div className="boxContainer">
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                </div>
                <h1>Intereste<span className="questionMark">d?</span></h1>
                <p><Link to="../../register">Register</Link> today and start planning your next adventure.</p>
            </div>
        </div>
    )
}
export default Splash;