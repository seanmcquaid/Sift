import React, { Component } from 'react';
import axios from "axios";
import AddReviewForm from '../../../Forms/AddReviewForm';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { connect } from "react-redux";
import "./EventReviews.css";
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards';
import Button from "../../../../components/utility/button/Button";

class EventReviews extends Component {
    constructor() {
        super()
        this.state = {
            list : [],
            msg : "",
            showAlert: false,
        }
    }

    componentDidMount(){
        axios({
            method : "POST",
            url : `${window.apiHost}/event/getEventReviews`,
            data : {
                email : this.props.login.email
            }
        }).then((reviewListFromDB)=>{
            // console.log(reviewListFromDB)
            this.setState(({
                list : reviewListFromDB
            }))
        })
    }

    // need to finish add review
    addReview = (event, review, stars) =>{
        axios({
            method : "POST",
            url : `${window.apiHost}/event/addEventReview/${event}`,
            data : {
                email : this.props.login.email
            }
        }).then((responseFromDB)=>{
            this.setState({
                list : responseFromDB
            })
        })
    }

    editReview = (dong)=>{

    }

    render() {
        if (this.state.list.data !== undefined) {
            var eventReviews = this.state.list.data.map((review, i) => {
                // console.log(review)
                return (
                    <div key={i} className="placeCard">
                        <div className="cardLeft">
                            <h4>{review.eventname}</h4>
                            <div>
                                <p>{review.review}</p>
                            </div>
                        </div>
                        <div className="buttonContainer">
                            <Button className="shareButton">Share</Button>
                            <Button clicked={() => this.editReview(review.eventname)} className="editButton">Edit</Button>
                            <Button clicked={() => this.removeReview(review.eventname)} className="deleteButton">Remove</Button>
                        </div>
                        
                    </div>
                )
            })
        }
        return (
            <div className="eventReviews">
                <h2>Reviews</h2>
                <AddReviewForm
                    placeholder="Add your event review here!"
                    addReview={this.addReview}
                />
                <PlaceCards cards={eventReviews}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps,null)(EventReviews);