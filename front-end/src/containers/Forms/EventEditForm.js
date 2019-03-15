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
            event: '',
            category : "",
            type: '',
            text: '',
            date:'',
            readabledate:'',
            eventTypes: ['Festival', 'Arts-Movies-Music', 'Sporting Events', 'Educational'],
            redirect : false,
            stars: ""
            // date: '', we may need another component just for events, 
            // unless we can figure out how to conditionally render a date field on only certain pages
        }
    }

    componentDidMount() {
        const eventname = this.props.match.params.place;
        const section = this.props.match.params.section;
        const category = this.props.match.params.category;
        // const eventname = this.props.match.params.
        axios({
            method: 'POST',
            url: `${window.apiHost}/events/${section}/getEventToEdit/${eventname}`,
            data: {
                email: this.props.login.email
            }
        }).then((responseFromDB) => {
            let textFromDB = responseFromDB.data.note || responseFromDB.data.review
            let eventFromDB = responseFromDB.data.eventname || responseFromDB.data.eventname
            let convertedDate = responseFromDB.data.date.toString().slice(0,10)
            let starsFromDB = responseFromDB.data.stars 
            this.setState({
                event : eventFromDB,
                category : category,
                type : responseFromDB.data.type,
                date: convertedDate,
                text : textFromDB,
                stars : starsFromDB
            })
        })
    
    }

    editevent = (event)=>{
        event.preventDefault();
        const eventname = this.props.match.params.place;
        const section = this.props.match.params.section;
        const updatedEventName = this.state.event;
        const updatedType = this.state.type;
        const updatedDate = this.state.date;
        const updatedReadableDate = this.state.readabledate
        const updatedText = this.state.text;
        const updatedStars = this.state.stars
        axios({
            method: 'POST',
            url: `${window.apiHost}/events/${section}/editevent/${eventname}`,
            data: {
                email: this.props.login.email,
                updatedEventName,
                updatedType,
                updatedDate,
                updatedReadableDate,
                updatedText,
                updatedStars
            }
        }).then((responseFromDB) => {
            this.setState({
                event : "",
                type : "",
                date: '',
                readabledate:'',
                text : "",
                redirect: true,
                stars : ""
            })
        })
    }

   

    changeevent = (event) => {
        this.setState({
            event: event.target.value
        })
    }

    changeType = (event) => {
        this.setState({
            type: event.target.value
        })
    }

    changeDate = (event) => {
        var date= event.target.value
        
        var currDate = (date).toString().slice(0,10)
        var currYear = currDate.slice(0,4)
        var currMonDay = (currDate.slice(6,10)).replace(/-0+/g, '-');
        var publishDate = `${currMonDay}-${currYear}`

        this.setState({
            readabledate: publishDate,
            date: date
        })
    }

    changeText = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    changeStars = (event) =>{
        this.setState({
            stars : event.target.value
        })
    }


    render() {
        let typeArray;
  
            typeArray = this.state.eventTypes.map((type, i) => {
                return (<option key={i} value={type}>{type}</option>)
            })

        let starDropdown;
        if(this.props.match.params.section === "reviews"){
            starDropdown = 
            <select id="EditReviewStars" value={this.state.stars} onChange={this.changeStars} required > 
                <option value="">{this.state.stars}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>;
        }
        

        if(this.state.redirect === true){
            const section = this.props.match.params.section;
                return <Redirect to={`/userHome/event/${section}`}/>
        } else {
            let minDate = new Date().toISOString().slice(0,10);
            let maxDate = '2030-03-10'
            return (
                <div className="EditFormContainer">
                    <form onSubmit={this.editevent} className="editForm">
                    <h2>Make your edits below!</h2>
                    <input onChange={this.changeevent} type="text" id="editPlace" defaultValue={this.state.event} />
                        <div className="editNameAndType">
                            
                            <select className="DropDownEdit Type" id="DropDownEdit" onChange={this.changeType}>
                                <option defaultValue={this.state.type}>{this.state.type}</option>
                                {typeArray}
                            </select>
                            <input onChange={this.changeDate} id="NewEventDateDropdown" type="date" min={minDate} max={maxDate} value={this.state.date}/>
                        </div>
                        {starDropdown}
                        <div className="editNote">
                            <textarea onChange={this.changeText} value={this.state.text} id="editText"></textarea>
                        </div>
                        <Button type="submit" className="submitButton">Update</Button>
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
