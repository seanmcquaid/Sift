import React, { Component } from 'react'

class PlaceCards extends Component {

    render(){
        let styles;
        console.log(this.props.cards)
        if (this.props.cards){
            if(this.props.cards.length === 0){
                styles = {visibility : "hidden"}
            } else {
                styles = {visibility : "visible"}
            }
        }
        return (
            <div className="placeCards" style={styles}>
                {this.props.cards}
            </div>
        )
    } 
}

export default PlaceCards;