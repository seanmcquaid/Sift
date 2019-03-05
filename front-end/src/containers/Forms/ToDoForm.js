import React, { Component } from 'react';
// import axios from 'axios';
import option from '../../components/utility/option/option'
import Button from '../../components/utility/button/Button'


class ToDoForm extends Component {
    constructor(){
        super()
        this.state = {
            place: '',
            type: '',
            // date: '', we may need another component just for events, 
            // unless we can figure out how to conditionally render a date field on only certain pages
        }
    }

    addNew = (event) => {
        event.preventDefault(event)
        console.log("someone added!")
        this.props.addNewPlace(this.state.place, this.state.type)
        console.log(this.state.place, this.state.type)
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
    
    render(){
        return(
            <div className="SearchAdd">
                <form onSubmit={this.addNew} className="TodoForm">
                    <input onChange={this.changePlace} type="text" id="NewPlace" placeholder={this.props.placeholder} value={this.state.place} />
                    <select className="Dropdown Type" onChange={this.changeType}> 
                        {/* may need handlers on all dropdown options??  instea of just above??*/}
                        <option default value={this.props.defaultType}>{this.props.defaultType}</option>
                        <option value={this.props.type2}>{this.props.type2}</option>
                        <option value={this.props.type3}>{this.props.type3}</option>
                        <option value={this.props.type4}>{this.props.type4}</option>
                    </select>
                    <Button type="submit" className="submitButton">Add</Button>
                </form>
            </div>
        )
    }
}

export default ToDoForm; 
