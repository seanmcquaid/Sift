import React, { Component } from 'react';

class EventFavorites extends Component {
    constructor() {
        super()
        this.state = {
            favorite: '',
            type: '',
            note: ''
        }
    }


    render() {
        return (
            <div className="EventFavorites">
                <div>
                    <form onSubmit={this.addEventFavorite} className="FavoriteForm">
                        <input onChange={this.changeEventFave} type="text" id="NewFave" placeholder="Add favorite..." value={this.state.favorite} />
                        <input onChange={this.changeEventNote} type="text" id="Note" placeholder="Remember for next time..." value={this.state.note} />
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
                                <th>Note</th>
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


export default EventFavorites;
