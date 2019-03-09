import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import Button from '../../components/utility/button/Button'
import {Redirect} from "react-router-dom";
import './EditForm.css'


class EditForm extends Component {
    constructor() {
        super()
        this.state = {
            place: '',
            type: '',
            text: '',
            foodTypes: ['Restaurant', 'Cafe', 'Bar', 'Diner'],
            activeTypes: ['Outdoors', 'Fitness', 'Sports', 'Trips'],
            cultureTypes: ['Music', 'Art', 'Theater', 'Festival'],
            eventTypes: ['Festival', 'Arts/Movies/Music', 'Sporting Events', 'Educational'],
            redirect : false
            // date: '', we may need another component just for events, 
            // unless we can figure out how to conditionally render a date field on only certain pages
        }
    }

    componentDidMount() {
        const placename = this.props.match.params.place
        // console.log(placename);
        axios({
            method: "POST",
            url: `http://localhost:3000/${this.props.category}/getPlace/${placename}`,
            data: {
                email: this.props.login.email
            }
        }).then((placeFromBackEnd) => {
            console.log(placeFromBackEnd)
            this.setState({
                place: placeFromBackEnd.data[0].placename,
                type: placeFromBackEnd.data[0].type,
                text: placeFromBackEnd.data[0].note,
                
            })
        })
    }

    editPlace = (event) => {
        event.preventDefault();
        axios({
            method: "POST",
            url: `http://localhost:3000/${this.props.category}/editPlace/${this.state.place}`,
            data: {
                email: this.props.login.email,
                originalPlace : this.state.place,
                type : this.state.type,
                note : this.state.text
            },
        }).then((updatedPlaceInfo) => {
            console.log(updatedPlaceInfo.data);
            this.setState({
                redirect : true
            })
        })
    }

    changePlace = (event) => {
        this.setState({
            place: event.target.value
        })
    }

    changeType = (event) => {
        this.setState({
            type: event.target.value
        })
    }

    changeDate = (event) => {
        this.setState({
            date: event.target.value
        })
    }

    changeText = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    render() {
        const foodTypeArray = this.state.foodTypes.map((type, i) => {
            return (<option key={i} value={type}>{type}</option>)
        })

        if(this.state.redirect === true){
            return(
                <Redirect to="userHome/{this.props.category}/{this.props.section}"/>
            )
        } else {
            return (
                <div className="SearchAddEdit">
                    <form onSubmit={this.editPlace} className="EditForm">
                        <div className="addNameAndType">
                            <input onChange={this.changePlace} type="text" id="NewPlace" defaultValue={this.state.place} />
                            <select className="Dropdown Type" id="Dropdown" onChange={this.changeType}>
                                <option defaultValue={this.state.type}>{this.state.type}</option>
                                {foodTypeArray}
                            </select>
                        </div>
                        <div className="addNote">
                            <textarea onChange={this.changeText} value={this.state.text} id="NewText"></textarea>
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

export default connect(mapStateToProps, null)(EditForm);
