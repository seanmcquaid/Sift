import React, { Component } from 'react';
import Button from '../../components/utility/button/Button'
import './EditForm.css'


class EditForm extends Component {
    constructor() {
        super()
        this.state = {
            place: '',
            type: '',
            text: ''
            // date: '', we may need another component just for events, 
            // unless we can figure out how to conditionally render a date field on only certain pages
        }
    }

    componentDidMount() {
        console.log(this.props)
        axios({
            method: "GET",
            url: `http://localhost:3000/getPlace/${place}`
        }).then((taskFromBackEnd) => {
            {
                this.setState({
                    task: taskFromBackEnd.data.task
                })
            }
        })
    }

    editPlace = (event) => {
        event.preventDefault(event)
        this.props.editPlace(this.state.place, this.state.type, this.state.text)
        // document.getElementById('Dropdown').value = this.props.defaultType;
        // this.setState({
        //     place: '',
        //     type: '',
        //     text: '',
        // })
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
            <div className="SearchAddEdit">
                <form onSubmit={this.editPlace} className="EditForm">
                    <div className="addNameAndType">
                        <input onChange={this.changePlace} type="text" id="NewPlace" placeholder={this.props.placeholder} value={this.state.place} />
                        <select className="Dropdown Type" id="Dropdown" onChange={this.changeType}>
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

export default EditForm; 
