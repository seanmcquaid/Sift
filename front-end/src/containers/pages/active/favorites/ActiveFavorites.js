import React, { Component } from 'react';

class ActiveFavorites extends Component {
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
            <div className="ActiveFavorites">
                <div>
                    <form onSubmit={this.addActiveFavorite} className="FavoriteForm">
                        <input onChange={this.changeActiveFave} type="text" id="NewFave" placeholder="Add favorite activity" value={this.state.favorite} />
                        <input onChange={this.changeActiveNote} type="text" id="Note" placeholder="Remember for next time..." value={this.state.note} />
                        <select className="Dropdown ActivityType">
                            <option default value="Outdoors" onClick={}>Outdoors</option>
                            <option value="Fitness" onClick={}>Fitness</option>
                            <option value="Sports" onClick={}>Sports</option>
                            <option value="Trips" onClick={}>Trips</option>
                        </select>
                    </form>
                </div>
                <div>
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>Activity</th>
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


export default ActiveFavorites;
