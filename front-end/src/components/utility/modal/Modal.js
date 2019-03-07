import React from 'react';
import './Modal.css'

const Modal = (props) => (
    <div className="Modal" show={props.show}>
        {props.children}
    </div>
)

export default Modal;