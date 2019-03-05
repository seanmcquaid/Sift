import React from 'react';
import './Button.css';

const Button = (props) => (
    <button
        className={props.className} id={props.id} type ={props.type} onClick={props.clicked}>{props.children}</button>
)

export default Button;