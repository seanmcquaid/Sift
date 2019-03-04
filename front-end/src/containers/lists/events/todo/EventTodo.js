import React, { Component } from 'react';

class EventToDo extends Component {
    constructor() {
        super()
        this.state = {
            event: '',
            type: '',
            date: ''

        }
    }

    render() {
        // in the logic for mapping through the data to make the table, we need to be SURE that the favorites button can be clicked to add the item
        // to the favorites and remove it from this table

        return (
            <div className="EventToDo">
                <div className="Search">
                    <form onSubmit={this.addNewEvent} className="TodoForm">
                        <input onChange={this.changeEvent} type="text" id="NewEvent" placeholder="Add Event" value={this.state.event} />
                        <input onChange={this.changeEventDate} type="date" id="EventDate" value={this.state.date} />
                        <select className="Dropdown EventType">
                            <option default value="Festival" onClick={}>Festival</option>
                            <option value="Cultural" onClick={}>Arts/Movies/Music</option>
                            <option value="Outdoors" onClick={}>Sports/Outdoors</option>
                            <option value="Educational" onClick={}>Educational</option>
                        </select>
                    </form>
                </div>
                <div>
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Type</th>
                                <th>Favorite</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* JSX for mapped array of activities! */}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default EventToDo;