import React, {Component} from "react";

class Reviews extends Component {
    render(){
        return(
            <div className="reviews">
                {this.props.reviews}
            </div>
        )
    }
}