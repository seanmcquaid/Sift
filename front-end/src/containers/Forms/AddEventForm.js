import React, { Component } from 'react';
import Button from '../../components/utility/button/Button'
import './AddEventForm.css'


class AddEventForm extends Component {
    constructor(){
        super()
        this.state = {
            events: '',
            type: '',
            readableDate:'',
            date:'',
            text: '',
            filter: '',
           
        }
    }

    addNewEvent = (event) => {
        event.preventDefault(event)
        this.props.addNewEvent(this.state.events, this.state.type, this.state.readableDate, this.state.text)
        document.getElementById('Dropdown').value = this.props.defaultType;
        this.setState({
            events: '',
            type: '',
            readableDate:'',
            text: '',
            
        })
    }

    changeEvent = (event) => {
        this.setState({
            events: event.target.value
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
            readableDate: publishDate,
            date: date
        })
        console.log(new Date())
    }

    changeText = (event) => {
        this.setState({
            text: event.target.value
        })
    }
    
    render(){
        // const typeArray = this.props.types
        // console.log(typeArray)
        let minDate = new Date().toISOString().slice(0,10);
        let maxDate = '2030-03-10'
        return(
            <div className="AddEventFormContainer">
                <h3>Add an event!</h3>
                <form onSubmit={this.addNewEvent} className="AddEventForm">
                    <div className="addEventName">
                        <input onChange={this.changeEvent} type="text" id="NewAddEvent" placeholder={this.props.placeholder} value={this.state.events} />
                    </div>
                    <div className="addEventTypeAndDate">
                        <select className="Dropdown Type" id="NewEventTypeDropdown" onChange={this.changeType}>
                            <option value="">{this.props.defaultType}</option>
                            {this.props.types}
                        </select>
                        <input onChange={this.changeDate} id="NewEventDateDropdown" type="date" min={minDate} max={maxDate} value={this.state.date}/>
                    </div>
                    <div className="AddNewEventNote">
                        <textarea onChange={this.changeText} id="AddNewEventText" placeholder={this.props.textType} value={this.state.text}></textarea>
                    </div>
                    <Button type="submit" className="submitButton">Add</Button>
                </form>
            </div>
        )
    }
}

export default AddEventForm; 
