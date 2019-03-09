import React, { Component } from 'react';
import Button from '../../components/utility/button/Button'
import './AddForm.css'


class AddEventForm extends Component {
    constructor(){
        super()
        this.state = {
            events: '',
            type: '',
            date:'',
            text: '',
            filter: ''
        }
    }

    addNewEvent = (event) => {
        event.preventDefault(event)
        this.props.addNewEvent(this.state.events, this.state.type, this.state.date, this.state.text)
        document.getElementById('Dropdown').value = this.props.defaultType;
        this.setState({
            events: '',
            type: '',
            date:'',
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
        this.setState({
            date: event.target.value
        })
    }

    changeText = (event) => {
        this.setState({
            text: event.target.value
        })
    }
    
    render(){
        // const typeArray = this.props.types
        // console.log(typeArray)

        return(
            <div className="SearchAddEdit">
                <form onSubmit={this.addNewEvent} className="AddForm">
                    <div className="addName">
                        <input onChange={this.changeEvent} type="text" id="NewPlace" placeholder={this.props.placeholder} value={this.state.events} />
                    </div>
                    <div className="addTypeAndDate">
                        <select className="Dropdown Type" id="Dropdown" onChange={this.changeType}>
                            <option value="">{this.props.defaultType}</option>
                            {this.props.types}
                        </select>
                        <input onChange={this.changeDate} className="Dropdown type" type="date" id="NewDate" value={this.state.date}/>
                    </div>
                    
                    <div className="addNote">
                        <textarea onChange={this.changeText} id="NewText" placeholder={this.props.textType} value={this.state.text}></textarea>
                    </div>
                    <Button type="submit" className="submitButton">Add</Button>
                </form>
            </div>
        )
    }
}

export default AddEventForm; 
