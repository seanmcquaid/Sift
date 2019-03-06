import React, { Component } from 'react'
import './PlaceCards.css'


class PlaceCards extends Component {


    render(){
        return (
            <div className="placeCards">
                {this.props.cards}
            </div>
        )
    } 
}

export default PlaceCards;

    




