import React from "react";
import SideNav from "../navBar/SideNav";
import './categoryHome.css';

function CategoryHomeLayout(props) {
    return (
        <div className='categoryHomeContainer'>
            <SideNav />
            <div className="mainHome">
                {props.children}
            </div>
        </div>
    )
}

export default CategoryHomeLayout;