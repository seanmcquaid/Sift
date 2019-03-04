import React, { Component } from 'react';

class ActiveFavorites extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div className="ActiveFavorites">
                <div>
                    <form onSubmit={this.addActiveFavorite} className="FavoriteForm">
                        <input onChange={this.changeActivityFave} type="text" id="NewActiveFave" placeholder="Add favorite activity" value={this.state.favoriteActivity} />
                        <input onChange={this.changeActiveNote} type="text" id="ActiveNote" placeholder="Remember for next time..." value={this.state.note} />
                        <select className="ActiveType">
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
