import React, { Component } from 'react';

class FoodToDo extends Component {
    constructor() {
        super()
        this.state = {
            place: '',
            type: '',

        }
    }

    render() {
        // in the logic for mapping through the data to make the table, we need to be SURE that the favorites button can be clicked to add the item
        // to the favorites and remove it from this table

        return (
            <div className="FoodToDo">
                <div className="Search">
                    <form onSubmit={this.addNewFood} className="TodoForm">
                        <input onChange={this.changeFood} type="text" id="NewActive" placeholder="Add Place" value={this.state.place} />
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





export default FoodToDo;