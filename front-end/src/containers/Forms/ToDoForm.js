import React, { Component } from 'react';
// import axios from 'axios';
import option from '../../components/utility/option/option'


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
                    <input onChange={this.changePlace} type="text" id="NewPlace" placeholder={this.props.placeHolder} value={this.state.place} />
                    <select className="Dropdown Type" onChange={this.changeType}> 
                        {/* may need handlers on all dropdown options??  instea of just above??*/}
                        <option default value={this.props.defaultType} />
                        <option value={this.props.type2} />
                        <option value={this.props.type3} />
                        <option value={this.props.type4} />
                    </select>
                    <button type="submit" className="submitButton">Add</button>
                </form>
            </div>
        )
    }
}

export default ToDoForm; 
