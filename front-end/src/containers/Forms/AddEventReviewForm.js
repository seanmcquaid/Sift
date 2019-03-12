import React, {Component} from "react";
import Button from "../../components/utility/button/Button";
import "./AddEventReviewForm.css"

class AddEventReviewForm extends Component {
    constructor() {
        super();
        this.state = {
            events: "",
            type:'',
            review: "",
            date:'',
            readableDate:'',
            stars: ""
        }
    }

    addNewReview = (event)=>{
        event.preventDefault();
        this.props.addReview(this.state.events,this.state.type, this.state.review, this.state.readableDate, this.state.stars);
        document.getElementsByClassName('type').value = this.props.defaultType;
        document.getElementsByClassName("starDropdown").value = this.props.defaultStars;
        this.setState({
            events: "",
            type:'',
            review: "",
            date:'',
            stars: ""
        })
    }

    changePlace = (event)=>{
        this.setState({
            events : event.target.value
        })
    }

    changeType = (event)=>{
        this.setState({
           type : event.target.value 
        })
    }

    changeDate = (event) => {
        var date= event.target.value
        
        var currDate = (date).toString().slice(0,10)
        var currYear = currDate.slice(0,4)
        var currMonDay = (currDate.slice(6,10)).replace(/-0+/g, '-');
        var publishDate = `${currMonDay}-${currYear}`

        this.setState({
            readableDate: publishDate,
            date: date
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
        let minDate = new Date().toISOString().slice(0,10);
        let maxDate = '2030-03-10'
        return(
            <div className="AddEventReviewForm">
                <form onSubmit={this.addNewReview} className="eventReviewForm">
                <div className="eventInput">
                    <input type="text" placeholder="Enter your place to review here!" value={this.state.place} id="newEvent" onChange={this.changePlace} required/>
                </div>
                <div className="typeStarDateInput">
                <select className="type" id="eventTypeDropdown" onChange={this.changeType} value={this.state.type} required>
                        <option value="">{this.props.defaultType}</option>
                        {this.props.types}
                    </select>
                    <select id="eventStarDropdown" value={this.state.stars} onChange={this.changeStars} required> 
                        <option value="">{this.props.defaultStars}</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <input onChange={this.changeDate} id="eventDateDropdown" type="date" min={minDate} max={maxDate} value={this.state.date}/>
                </div>
                <div className="addEventReview">
                    <textarea onChange={this.changeReview} id="newEventReview" placeholder={this.props.placeholder} value={this.state.review} required></textarea>
                        <Button type="submit" className="submitButton">Add Review</Button>
                </div>
                </form>
            </div>
        )
    }
}

export default AddEventReviewForm;