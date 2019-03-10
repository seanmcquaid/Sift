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
            category : "",
            type: '',
            text: '',
            foodTypes: ['Restaurant', 'Cafe', 'Bar', 'Diner'],
            activeTypes: ['Outdoors', 'Fitness', 'Sports', 'Trips'],
            cultureTypes: ['Music', 'Art', 'Theater', 'Festival'],
            eventTypes: ['Festival', 'Arts-Movies-Music', 'Sporting Events', 'Educational'],
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
            url: `${window.apiHost}/${category}/${section}/getPlaceToEdit/${placename}`,
            data: {
                email: this.props.login.email
            }
        }).then((responseFromDB) => {
            let textFromDB = responseFromDB.data.note || responseFromDB.data.review
            this.setState({
                place : responseFromDB.data.placename,
                category : category,
                type : responseFromDB.data.type,
                text : textFromDB
            })
            // console.log(this.state)
        })
    
    }

    editPlace = (event)=>{
        event.preventDefault();
        const placename = this.props.match.params.place;
        const section = this.props.match.params.section;
        const category = this.props.match.params.category;
        const updatedPlacename = this.state.place;
        const updatedType = this.state.type;
        const updatedText = this.state.text;
        axios({
            method: 'POST',
            url: `${window.apiHost}/${category}/${section}/editPlace/${placename}`,
            data: {
                email: this.props.login.email,
                updatedPlacename,
                updatedType,
                updatedText
            }
        }).then((responseFromDB) => {
            this.setState({
                place : "",
                category : "",
                type : "",
                text : "",
                redirect: true
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
        const category = this.props.match.params.category;
        let typeArray;
        if(category === "food"){
            typeArray = this.state.foodTypes.map((type, i) => {
                return (<option key={i} value={type}>{type}</option>)
            })
        } else if(category === "culture"){
            typeArray = this.state.cultureTypes.map((type, i) => {
                return (<option key={i} value={type}>{type}</option>)
            })
        } else if(category === "active"){
            typeArray = this.state.activeTypes.map((type, i) => {
                return (<option key={i} value={type}>{type}</option>)
            })
        } else if (category === "event"){
            typeArray = this.state.eventTypes.map((type, i) => {
                return (<option key={i} value={type}>{type}</option>)
            })
        }

        if(this.state.redirect === true){
            const section = this.props.match.params.section;
            console.log(section)
            return(
                <Redirect to={`/userHome/${category}/${section}`}/>
            )
        } else {
            return (
                <div className="SearchAddEdit">
                    <form onSubmit={this.editPlace} className="EditForm">
                        <div className="addNameAndType">
                            <input onChange={this.changePlace} type="text" id="NewPlace" defaultValue={this.state.place} />
                            <select className="Dropdown Type" id="Dropdown" onChange={this.changeType}>
                                <option defaultValue={this.state.type}>{this.state.type}</option>
                                {typeArray}
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
