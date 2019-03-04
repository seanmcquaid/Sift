import React from "react";
import "./Layout.css";
import Nav from "../../containers/navBar/Nav";
import Footer from "../utility/footer/Footer";
import Aux from "../../hoc/Aux";

function Layout(props){
    return(
        <Aux>
            <Nav/>
            {props.children}
            <Footer/>
        </Aux>
    )
}

export default Layout;