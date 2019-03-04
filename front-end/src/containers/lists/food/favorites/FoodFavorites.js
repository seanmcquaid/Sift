import React, { Component } from 'react';

class FoodFavorites extends Component {
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
            <div className="FoodFavorites">
                <div>
                    <form onSubmit={this.addFoodFavorite} className="FavoriteForm">
                        <input onChange={this.changeFoodFave} type="text" id="NewFave" placeholder="Add favorite..." value={this.state.favorite} />
                        <input onChange={this.changeFoodNote} type="text" id="Note" placeholder="Remember for next time..." value={this.state.note} />
                        <select className="Dropdown FoodType">
                            <option default value="Restaurant" onClick={}>Restaurant</option>
                            <option value="Cafe" onClick={}>Cafe</option>
                            <option value="Bar" onClick={}>Bar</option>
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


export default FoodFavorites;
