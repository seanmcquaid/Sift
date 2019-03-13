import React, { Component } from 'react';
import axios from "axios";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import AddReviewForm from '../../../Forms/AddReviewForm';
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards';
import Button from "../../../../components/utility/button/Button";
import '../../reviews.css';

class ActiveReviews extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            types: ['Outdoors', 'Fitness', 'Sports', 'Trips'],
            msg: "",
            showAlert: false,
        }
    }

    componentDidMount() {
        axios({
            method: "POST",
            url: `${window.apiHost}/active/getActiveReviews`,
            data: {
                email: this.props.login.email
            }
        }).then((reviewListFromDB) => {
            this.setState(({
                list: reviewListFromDB
            }))
        })
    }

    addReview = (activity, review, type, stars) =>{
        axios({
            method : "POST",
            url : `${window.apiHost}/active/addActiveReview/${activity}`,
            data : {
                email : this.props.login.email,
                activity,
                review,
                type,
                stars
            }
        }).then((responseFromDB)=>{
            this.setState({
                list : responseFromDB,
                msg : `Congrats! You've added a review for ${activity}!`,
                showAlert: true,
            })
        })
    }

    removeReview = (activity)=>{
        axios({
            method : "POST",
            url: `${window.apiHost}/active/deleteActiveReview/${activity}`,
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
        let category = "active";
        let section = "reviews";
        if (this.state.list.data !== undefined) {
            document.querySelector(".placeCards").style.backgroundColor = "#ffa094";
            var activeReviews = this.state.list.data.map((review, i) => {
                return (
                    <div key={i} className="placeCard">
                        <div className="cardLeft">
                            <h4>{review.placename} – {review.stars} Stars</h4>
                            <p>{review.review}</p>
                        </div>
                        <div className="cardRight">
                            <div className="buttonContainer">
                                <Button className="editButton"><Link to={"/userHome/" + category + "/edit/" + section + "/" + review.placename} >Edit</Link></Button>
                                <Button clicked={() => this.removeReview(review.placename)} className="deleteButton">Remove</Button>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        const typeArray = this.state.types.map((type, i) => {
            return (<option key={i} value={type}>{type}</option>)
        })

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
                        title="Added to Faves"
                        text={this.state.msg}
                        onConfirm={() => this.setState({ showAlert: false })}
                    />
                    <div className="reviewBody">
                        <div className="reviewLeft">
                            <AddReviewForm
                                placeholder="Add your active review here!"
                                defaultType="Choose type!"
                                defaultStars="How many stars?"
                                types={typeArray}
                                addReview={this.addReview}
                            />
                        </div>
                        <div className="reviewRight">
                            <PlaceCards cards={activeReviews} />
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

export default connect(mapStateToProps, null)(ActiveReviews);