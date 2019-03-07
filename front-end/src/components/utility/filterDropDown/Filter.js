import React, { Component } from 'react';
import Button from '../button/Button'

class Filter extends Component{
    constructor(){
        super()
        this.state = {
            filter: ''
        }
    }

    filter = (event) => {
        event.preventDefault(event)
        this.props.filterResults(this.state.filter)
    }

    changeFilter = (event) => {
        this.setState({
            filter: event.target.value
        })
        console.log('changed filter')
    }

    render(){
        return (
            <form onSubmit={this.filter} className="filterForm">
                <select className={this.props.className} onChange={this.changeFilter}>
                    <option value="">{this.props.defaultFilter}</option>
                    {this.props.filters}
                </select>
                <Button type="submit" className="submitButton">Filter</Button>
            </form>
        )
    }
}

export default Filter;
