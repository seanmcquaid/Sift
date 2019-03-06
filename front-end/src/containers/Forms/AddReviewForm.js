import React, {Component} from "react";

class AddReviewForm extends Component {
    constructor() {
        super();
        this.state = {
            review : "",
            stars : ""
        }
    }

    addNewReview = (event)=>{
        event.preventDefault();
        this.props.addReview(this.state.review, this.state.stars)
    }

    changeStars = (event)=>{
        this.setState({
           stars : event.target.value 
        })
    }

    changeReview = (event)=>{
        this.setState({
            review : event.target.value
        })
    }
    
    render(){
        return(
            <div className="AddReviewForm">
                <form onSubmit={this.addNewReview} className="reviewForm">
                    <select className="starDropdown" onChange={this.changeStars}> 
                        <option value="">How many stars?</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <input onChange={this.changeReview} type="text" id="newReview" placeholder="Add review here!" value={this.state.reviews} />
                    <Button type="submit" className="submitButton">Add</Button>
                </form>
            </div>
        )
    }
}