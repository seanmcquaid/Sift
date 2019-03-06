import React, { Component } from 'react';
// import axios from 'axios';
import Button from '../../components/utility/button/Button'


class AddForm extends Component {
    constructor(){
        super()
        this.state = {
            place: '',
            type: '',
            text: ''
            // date: '', we may need another component just for events, 
            // unless we can figure out how to conditionally render a date field on only certain pages
        }
    }

    addNew = (event) => {
        event.preventDefault(event)
        // console.log("someone added!")
        this.props.addNewPlace(this.state.place, this.state.type, this.state.text)
        // console.log(this.state.place, this.state.type, this.state.text)
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
    
    render(){
        return(
            <div className="SearchAdd">
                <form onSubmit={this.addNew} className="TodoForm">
                    <input onChange={this.changePlace} type="text" id="NewPlace" placeholder={this.props.placeholder} value={this.state.place} />
                    <select className="Dropdown Type" onChange={this.changeType}> 
                        {/* may need handlers on all dropdown options??  instea of just above??*/}
                        <option value="">Choose type!</option>
                        <option value={this.props.defaultType}>{this.props.defaultType}</option>
                        <option value={this.props.type2}>{this.props.type2}</option>
                        <option value={this.props.type3}>{this.props.type3}</option>
                        <option value={this.props.type4}>{this.props.type4}</option>
                    </select>
                    <input onChange={this.changeText} type="text" id="newText" placeholder={this.props.textType} value={this.state.text} />
                    <Button type="submit" className="submitButton">Add</Button>
                </form>
            </div>
        )
    }
}

export default AddForm; 
