import React, { Component } from 'react';
import axios from "axios";
import AddEventReviewForm from '../../../Forms/AddEventReviewForm';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import "./EventReviews.css";
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards';
import Button from "../../../../components/utility/button/Button";

class EventReviews extends Component {
    constructor() {
        super()
        this.state = {
            list : [],
            date:"",
            readableDate:'',
            msg : "",
            types: ['Festival','Arts-Movies-Music', 'Sporting Events', 'Educational'],
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
    addReview = (event, type, review, date, stars) =>{
        axios({
            method : "POST",
            url : `${window.apiHost}/event/addEventReview/${event}`,
            data : {
                email : this.props.login.email,
                event,
                type,
                review,
                date,
                stars
            }
        }).then((responseFromDB)=>{
            // console.log(responseFromDB)
            this.setState({
                list : responseFromDB,
                msg : `Congrats! You've added a review for ${event}!`,
                showAlert: true,
            })
        })
    }

    editReview = (dong)=>{

    }

    removeReview = (event)=>{
        axios({
            method : "POST",
            url: `${window.apiHost}/event/deleteEventReview/${event}`,
            data :{
                email : this.props.login.email
            }
        }).then((backEndResponse)=>{
            this.setState({
                list : backEndResponse
            })
        })
    }

    render() {
        let category = "event";
        let section = "reviews";
        if (this.state.list.data !== undefined) {
            var EventReviews = this.state.list.data.map((review, i) => {
                return (
                    <div key={i} className="placeCard">
                        <div className="cardLeft">
                            <h4>{review.eventname}</h4>
                            <p>{review.review}</p>
                        </div>
                        <div className="stars">
                                {review.date}
                            <p> {review.stars} Stars</p>
                        </div>
                        <div className="buttonContainer">
                            <Button className="shareButton">Share</Button>
                            <Button className="editButton"><Link to={"/userHome/"+ category + "/edit/" + section + "/" + review.eventname} >Edit</Link></Button>
                            <Button clicked={() => this.removeReview(review.eventname)} className="deleteButton">Remove</Button>
                        </div>
                        
                    </div>
                )
            })
        }

        const typeArray = this.state.types.map((type, i)=>{
            return (<option key={i} value={type}>{type}</option>)
        });

        return (
            <div className="eventReviews">
                <h2>Reviews</h2>
                <SweetAlert
                    show={this.state.showAlert}
                    title="Added to Faves"
                    text={this.state.msg}
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                <AddEventReviewForm
                    placeholder="Add your event review here!"
                    defaultType= "Choose type!"
                    types={typeArray}
                    addReview={this.addReview}
                />
                <PlaceCards cards={EventReviews}/>
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