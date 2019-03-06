import React, { Component } from 'react'


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

    




