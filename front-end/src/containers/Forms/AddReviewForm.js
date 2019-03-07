import React, {Component} from "react";
import Button from "../../components/utility/button/Button";
import "./AddReviewForm.css"

class AddReviewForm extends Component {
    constructor() {
        super();
        this.state = {
            place: "",
            review : "",
            type: "",
            stars : ""
        }
    }

    addNewReview = (event)=>{
        event.preventDefault();
        this.props.addReview(this.state.place,this.state.review, this.state.type, this.state.stars)
    }

    changePlace= (event)=>{
        this.setState({
            place : event.target.value
        })
    }

    changeType = (event)=>{
        this.setState({
           type : event.target.value 
        })
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
                <div className="placeInput">
                    <input type="text" placeholder="Enter your place to review here!" id="newPlace" onChange={this.changePlace}/>
                </div>
                <div className="typeStarInput">
                <select className="type" onChange={this.changeType}>
                        <option value="">{this.props.defaultType}</option>
                        {this.props.types}
                    </select>
                    <select className="starDropdown" onChange={this.changeStars}> 
                        <option value="">How many stars?</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="addReview">
                    <textarea onChange={this.changeReview} id="newReview" placeholder={this.props.placeholder} value={this.state.review}></textarea>
                        <Button type="submit" className="submitButton">Add Review</Button>
                </div>
                </form>
            </div>
        )
    }
}

export default AddReviewForm;