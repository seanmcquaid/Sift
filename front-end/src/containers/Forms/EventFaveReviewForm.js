import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import Button from '../../components/utility/button/Button'
import {Redirect} from "react-router-dom";
import './EventFaveReviewForm.css'


class EventFaveReviewForm extends Component {
    constructor() {
        super()
        this.state = {
            place:'',
            category:'',
            review:'',
            type: '',
            stars: '',
            readabledate:'',
            redirect : false
            // date: '', we may need another component just for events, 
            // unless we can figure out how to conditionally render a date field on only certain pages
        }
    }

    componentDidMount() {
        const placename = this.props.match.params.place;
        console.log(placename)
        const section = this.props.match.params.section;
        const category = this.props.match.params.category;
    
        axios({
            method: 'POST',
            url: `${window.apiHost}/events/${section}/getFaveToReview/${placename}`,
            data: {
                email: this.props.login.email
            }
        }).then((responseFromDB) => {
            this.setState({
                place : responseFromDB.data.eventname,
                type : responseFromDB.data.type,
                readabledate: responseFromDB.data.readabledate
            })
            
        })
        console.log(this.state)
    }

    editPlace = (event)=>{
        event.preventDefault();
        const placename = this.props.match.params.place;
        const section = this.props.match.params.section;
        const category = this.props.match.params.category;
        const updatedReview = this.state.review;
        const updatedStars = this.state.stars;
        axios({
            method: 'POST',
            url: `${window.apiHost}/events/${section}/reviewFave/${placename}`,
            data: {
                email: this.props.login.email,
                updatedReview,
                updatedStars
            }
        }).then((responseFromDB) => {
            this.setState({
                stars:'',
                review: "",
                redirect: true
            })
        })
    }

   
    changePlace = (event) => {}

    changeType = (event)=>{}

    changeDate = (event)=>{}

    changeReview = (event) => {
        this.setState({
            review: event.target.value
        })
    }

    changeStars = (event) => {
        this.setState({
            stars: event.target.value
        })
    }


    render() {
        console.log(this.state.redirect)
        console.log(this.state)
        console.log(this.state.readabledate)

        if(this.state.redirect === true){
            const section = this.props.match.params.section;
            // const category = this.props.match.params.category;
            return(
                <Redirect to={`/userHome/event/${section}`}/>
            )
        } else {
            return (
                <div className="EventFaveReviewFormContainer">
                    <form onSubmit={this.editPlace} className="EventFaveReviewForm">
                        <div className="addEventReviewNameTypeDate">
                            <input onChange={this.changePlace} type="text" id="NewFaveReviewEvent" value={this.state.place} required />
                            <div className="NewFaveReviewEventTypeStars">
                                <select id="NewFaveReviewEventType" onChange={this.changeType}>
                                    <option defaultValue={this.state.type}>{this.state.type}</option>
                                </select>
                                <select id="NewFaveReviewEventStars" value={this.state.stars} onChange={this.changeStars} required > 
                                    <option value="">{this.props.defaultStars}</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                    <input onChange={this.changeDate} type="text" id="NewFaveReviewEventDate" value={this.state.readabledate} required />
                        </div>
                        <div className="addNewEventReview">
                            <textarea onChange={this.changeReview} value={this.state.review} id="NewFaveReviewEventReview"></textarea>
                        </div>
                        <Button type="submit" className="submitButton">Add</Button>
                    </form>
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

export default connect(mapStateToProps, null)(EventFaveReviewForm);
