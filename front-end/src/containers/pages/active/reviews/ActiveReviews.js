import React, { Component } from 'react';
import axios from "axios";
import AddReviewForm from '../../../Forms/AddReviewForm';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { connect } from "react-redux";
import "./ActiveReviews.css";
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards';
import Button from "../../../../components/utility/button/Button";

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

    addReview = (activity, review, stars) => {
        axios({
            method: "POST",
            url: `${window.apiHost}/active/addActiveReview/${activity}`,
            data: {
                email: this.props.login.email
            }
        }).then((responseFromDB) => {
            this.setState({
                list: responseFromDB
            })
        })
    }

    editReview = (dong) => {

    }

    render() {

        const typeArray = this.state.types.map((type, i) => {
            return (<option key={i} value={type}>{type}</option>)
        })

        if (this.state.list.data !== undefined) {
            var activeReviews = this.state.list.data.map((review, i) => {
                return (
                    <div key={i} className="placeCard">
                        <div className="cardLeft">
                            <h4>{review.placename}</h4>
                            <div>
                                <p>{review.review}</p>
                            </div>
                        </div>
                        <div className="buttonContainer">
                            <Button className="shareButton">Share</Button>
                            <Button clicked={() => this.editReview(review.placename)} className="editButton">Edit</Button>
                            <Button clicked={() => this.removeReview(review.placename)} className="deleteButton">Remove</Button>
                        </div>

                    </div>
                )
            })
        }
        return (
            <div className="ActiveReviews">
                <h2>Reviews</h2>
                <AddReviewForm
                    placeholder="Add your review here!"
                    addReview={this.addReview}
                    defaultType={"Choose a type!"}
                    types={typeArray}
                />
                <PlaceCards cards={activeReviews} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps, null)(ActiveReviews);