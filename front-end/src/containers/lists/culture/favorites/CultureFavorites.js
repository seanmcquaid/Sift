import React, { Component } from 'react';

class CultureFavorites extends Component {
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
            <div className="CultureFavorites">
                <div>
                    <form onSubmit={this.addCultureFavorite} className="FavoriteForm">
                        <input onChange={this.changeCultureFave} type="text" id="NewFave" placeholder="Add favorite..." value={this.state.favorite} />
                        <input onChange={this.changeCultureNote} type="text" id="Note" placeholder="Remember for next time..." value={this.state.note} />
                        <select className="Dropdown CultureType">
                            <option default value="Museum/Gallery" onClick={}>Museum/Gallery</option>
                            <option value="Performance" onClick={}>Performance</option>
                            <option value="Movies/Music" onClick={}>Movies/Music</option>
                            <option value="Literature/Learning" onClick={}>Literature/Learning</option>
                        </select>
                    </form>
                </div>
                <div>
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>Place</th>
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


export default CultureFavorites;
