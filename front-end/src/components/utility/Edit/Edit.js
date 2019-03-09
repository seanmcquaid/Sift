import React from "react";

function Edit (props){
    return(
        <div className="Edit">
            <h2>Edit</h2>
            {props.children}
        </div>
    )
}

export default Edit;