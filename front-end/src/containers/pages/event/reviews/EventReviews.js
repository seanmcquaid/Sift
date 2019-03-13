import React, { Component } from 'react';
import axios from "axios";

import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import AddEventReviewForm from '../../../Forms/AddEventReviewForm';
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards';
import Button from "../../../../components/utility/button/Button";
import '../../reviews.css';

class EventReviews extends Component {
    constructor() {
        super()
        this.state = {
            list : [],
            types: ['Festival','Arts-Movies-Music', 'Sporting Events', 'Educational'],
            date:"",
            readabledate:'',
            stars:'',
            msg : "",
            showAlert: false,
        }
    }

    componentDidMount(){
        axios({
            method : "POST",
            url : `${window.apiHost}/events/getEventReviews`,
            data : {
                email : this.props.login.email
            }
        }).then((reviewListFromDB)=>{
            this.setState(({
                list : reviewListFromDB
            }))
        })
    }


    addReview = (event, type, review, date, readabledate, stars) =>{

        axios({
            method : "POST",
            url : `${window.apiHost}/events/addEventReview/${event}`,
            data : {
                email : this.props.login.email,
                event,
                type,
                review,
                date,
                readabledate,
                stars
            }
        }).then((responseFromDB)=>{
            this.setState({
                list : responseFromDB,
                msg : `Congrats! You've added a review for ${event}!`,
                showAlert: true,
            })
        })
    }

    removeReview = (event)=>{
        axios({
            method : "POST",
            url: `${window.apiHost}/events/deleteEventReview/${event}`,
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
        let category = "events";
        let section = "reviews";
        if (this.state.list.data !== undefined) {
            var EventReviews = this.state.list.data.map((review, i) => {
                return (
                    <div key={i} className="placeCard">
                        <div className="cardLeft">
                            <h4>{review.eventname} - {review.stars} Stars </h4>
                            <p>{review.readabledate}</p>
                            <p>{review.review}</p>
                        </div>

                        <div className="cardRight">
                            <div className="buttonContainer">
                                <Button className="shareButton">Share</Button>
                                <Button className="editButton"><Link to={"/userHome/"+ category + "/edit/" + section + "/" + review.eventname} >Edit</Link></Button>
                                <Button clicked={() => this.removeReview(review.eventname)} className="deleteButton">Remove</Button>
                            </div>
                        </div>  

                    </div>
                )
            })
        } 
        
        // console.log(document.querySelector(".placeCards").style.backgroundColor)
        // if (this.state.list.length === 0){
        //     document.querySelector(".placeCards").style.backgroundColor = "#ffebaf";
        // } else {
            
        // }
        console.log(this.state.list)
        const typeArray = this.state.types.map((type, i)=>{
            return (<option key={i} value={type}>{type}</option>)
        });

        if (this.props.login.length === 0) {
            return (
                <Redirect to="/login" />
            )
        } else {
            return (
                <div className="Reviews">
                    <h2>Reviews</h2>
                    <SweetAlert
                        show={this.state.showAlert}
                        title="Review Added"
                        text={this.state.msg}
                        confirmBtnBsStyle="danger"
                        onConfirm={() => this.setState({ showAlert: false })}
                    />
                    <div className="reviewBody">
                        <div className="reviewLeft">
                            <AddEventReviewForm
                                placeholder="Add your event review here!"
                                defaultType= "Choose type!"
                                defaultStars="How many stars?"
                                types={typeArray}
                                addReview={this.addReview}
                            />
                        </div>
                        <div className="reviewRight">
                            <PlaceCards cards={EventReviews}/>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps,null)(EventReviews);