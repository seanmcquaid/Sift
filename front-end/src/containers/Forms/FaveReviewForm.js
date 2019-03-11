import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import Button from '../../components/utility/button/Button'
import {Redirect} from "react-router-dom";
import './FaveReviewForm.css'


class FaveReviewForm extends Component {
    constructor() {
        super()
        this.state = {
            place:'',
            category:'',
            review:'',
            type: '',
            stars: '',
            redirect : false
            // date: '', we may need another component just for events, 
            // unless we can figure out how to conditionally render a date field on only certain pages
        }
    }

    componentDidMount() {
        const placename = this.props.match.params.place;
        const section = this.props.match.params.section;
        const category = this.props.match.params.category;
    
        axios({
            method: 'POST',
            url: `${window.apiHost}/${category}/${section}/getFaveToReview/${placename}`,
            data: {
                email: this.props.login.email
            }
        }).then((responseFromDB) => {
            this.setState({
                place : responseFromDB.data.placename,
                category : category,
                type : responseFromDB.data.type,
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
            url: `${window.apiHost}/${category}/${section}/reviewFave/${placename}`,
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

        if(this.state.redirect === true){
            const section = this.props.match.params.section;
            const category = this.props.match.params.category;
            return(
                <Redirect to={`/userHome/${category}/${section}`}/>
            )
        } else {
            return (
                <div className="FaveReviewFormContainer">
                    <form onSubmit={this.editPlace} className="FaveReviewForm">
                        <h3>Add your review!</h3>
                        <div className="addFaveReviewInput">
                            <input onChange={this.changePlace} type="text" id="NewFaveReview" value={this.state.place} />
                            <div className="typeAndStars">
                                <select className="DropdownFaveReviewType Type" id="FaveDropDown" onChange={this.changeType}>
                                    <option defaultValue={this.state.type}>{this.state.type}</option>
                                </select>
                                <select className="faveReviewStarDropdown" value={this.state.stars} onChange={this.changeStars} required> 
                                    <option value="5">Stars</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div className="addFaveReview">
                            <textarea onChange={this.changeReview} value={this.state.review} id="NewFaveReviewText"></textarea>
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

export default connect(mapStateToProps, null)(FaveReviewForm);
