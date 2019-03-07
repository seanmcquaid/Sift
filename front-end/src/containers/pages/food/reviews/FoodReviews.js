import React, { Component } from 'react';
import axios from "axios";
import AddReviewForm from '../../../Forms/AddReviewForm';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { connect } from "react-redux";
import "./FoodReviews.css";
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards';
import Button from "../../../../components/utility/button/Button";

class FoodReviews extends Component {
    constructor() {
        super()
        this.state = {
            list : [],
            msg : "",
            types : ['Restaurant', 'Cafe', 'Bar', 'Diner'],
            showAlert: false,
        }
    }

    componentDidMount(){
        axios({
            method : "POST",
            url : `${window.apiHost}/food/getFoodReviews`,
            data : {
                email : this.props.login.email
            }
        }).then((reviewListFromDB)=>{
            console.log(reviewListFromDB)
            this.setState(({
                list : reviewListFromDB
            }))
        })
    }

    // need to finish add review
    addReview = (place, review, type, stars) =>{
        axios({
            method : "POST",
            url : `${window.apiHost}/food/addFoodReview/${place}`,
            data : {
                email : this.props.login.email,
                place,
                review,
                type,
                stars
            }
        }).then((responseFromDB)=>{
            // console.log(responseFromDB)
            this.setState({
                list : responseFromDB,
                msg : `Congrats! You've added a review for ${place}!`,
                showAlert: true,
            })
        })
    }

    editReview = (dong)=>{

    }

    deleteReview = ()=>{
        
    }

    render() {
        if (this.state.list.data !== undefined) {
            var foodReviews = this.state.list.data.map((review, i) => {
                return (
                    <div key={i} className="placeCard">
                        <div className="cardLeft">
                            <h4>{review.placename}</h4>
                            <p>{review.review}</p>
                        </div>
                        <div className="stars">
                            <p> {review.stars} Stars</p>
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

        const typeArray = this.state.types.map((type, i)=>{
            return (<option key={i} value={type}>{type}</option>)
        });

        return (
            <div className="FoodReviews">
                <h2>Reviews</h2>
                <SweetAlert
                    show={this.state.showAlert}
                    title="Added to Faves"
                    text={this.state.msg}
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                <AddReviewForm
                    placeholder="Add your food review here!"
                    defaultType= "Choose type!"
                    types={typeArray}
                    addReview={this.addReview}
                />
                <PlaceCards cards={foodReviews}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps,null)(FoodReviews);