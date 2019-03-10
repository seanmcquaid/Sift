import React, { Component } from 'react';
import Button from '../../components/utility/button/Button'
import './AddForm.css'


class AddForm extends Component {
    constructor() {
        super()
        this.state = {
            place: '',
            type: '',
            text: '',
            filter: ''
            // date: '', we may need another component just for events, 
            // unless we can figure out how to conditionally render a date field on only certain pages
        }
    }

    addNew = (event) => {
        event.preventDefault(event)
        this.props.addNewPlace(this.state.place, this.state.type, this.state.text)
        document.getElementById('Dropdown').value = this.props.defaultType;
        this.setState({
            place: '',
            type: '',
            text: '',
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

        return (
            <div className="addFormContainer">
                <form onSubmit={this.addNew} className="addForm">
                    <h3>{this.props.title}</h3>
                    <div className="addNameAndType">
                        <input onChange={this.changePlace} type="text" id="NewPlace" placeholder={this.props.placeholder} value={this.state.place} required />
                        <select className="Dropdown Type" id="Dropdown" onChange={this.changeType} required>
                            <option value="">{this.props.defaultType}</option>
                            {this.props.types}
                        </select>
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

export default AddForm;

