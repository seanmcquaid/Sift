import React from "react";

function Layout (props){
    return(
        <div className="container">
            <Navbar/>
            {props.children}
            <Footer/>
        </div>
    )
} 

export default Layout;