import React, { Component } from 'react';

class CultureToDo extends Component {
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
            <div className="CultureToDo">
                <div className="Search">
                    <form onSubmit={this.addNewCulture} className="TodoForm">
                        <input onChange={this.changeCulture} type="text" id="NewActive" placeholder="Add Place" value={this.state.place} />
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


export default CultureToDo;