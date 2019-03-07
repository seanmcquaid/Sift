import React from 'react';
import './Modal.css'
import { prependOnceListener } from 'cluster';

const Modal = (props) => (
    <div className="Modal" show={this.props.show}>
        {props.children}
    </div>
)

export default Modal;