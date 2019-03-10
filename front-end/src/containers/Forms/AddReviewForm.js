import React, {Component} from "react";
import Button from "../../components/utility/button/Button";
import "./AddReviewForm.css"

class AddReviewForm extends Component {
    constructor() {
        super();
        this.state = {
            place: "",
            review: "",
            type: "",
            stars: ""
        }
    }

    addNewReview = (event)=>{
        event.preventDefault();
        this.props.addReview(this.state.place,this.state.review, this.state.type, this.state.stars);
        document.getElementsByClassName('type').value = this.props.defaultType;
        document.getElementsByClassName("starDropdown").value = this.props.defaultStars;
        this.setState({
            place: "",
            review: "",
            type: "",
            stars: ""
        })
    }

    changePlace = (event)=>{
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
                    <input type="text" placeholder="Enter your place to review here!" value={this.state.place}id="newPlace" onChange={this.changePlace} required/>
                </div>
                <div className="typeStarInput">
                <select className="type" id="reviewDropDown" onChange={this.changeType} value={this.state.type} required>
                        <option value="">{this.props.defaultType}</option>
                        {this.props.types}
                    </select>
                    <select className="starDropDown" id="starDropDown" value={this.state.stars} onChange={this.changeStars} required> 
                        <option value="">{this.props.defaultStars}</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="addReview">
                    <textarea onChange={this.changeReview} id="newReview" placeholder={this.props.placeholder} value={this.state.review} required></textarea>
                        <Button type="submit" className="submitButton">Add Review</Button>
                </div>
                </form>
            </div>
        )
    }
}

export default AddReviewForm;