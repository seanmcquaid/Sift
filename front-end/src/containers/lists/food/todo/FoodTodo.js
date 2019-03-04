import React, { Component } from 'react';
import axios from 'axios';

class FoodToDo extends Component {
    constructor() {
        super()
        this.state = {
            foodList: [],
            place: '',
            type: '',

        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: `http://localhost:3000/getFoodList`
        }).then((foodListFromDB)=>{
            console.log(foodListFromDB)
            this.setState({
                foodList: foodListFromDB
            })
        })
    }

    addNewFood = (place, type) => {
        console.log(place, type)
        axios({
            method: 'POST',
            url: 'http://localhost:3000/addFood',
            data: {
                place: place,
                type: type
            }
        }).then((backEndResponse)=>{
            this.setState({
                foodList: backEndResponse.data
            })
        })
    }

    changeFood = (event) => {
        this.setState({
            place: event.target.value
        })
    }

    changeFoodType = (event) => {
        this.setState({
            type: event.target.value
        })
    }

    render() {
        // in the logic for mapping through the data to make the table, we need to be SURE that the favorites button can be clicked to add the item
        // to the favorites and remove it from this table
        // const foodArray = 

        return (
            <div className="FoodToDo">
                <div className="Search">
                    <form onSubmit={this.addNewFood} className="TodoForm">
                        <input onChange={this.changeFood} type="text" id="NewActive" placeholder="Add Place" value={this.state.place} />
                        <select className="Dropdown FoodType" onChange={this.changeFoodType}>
                            <option default value="Restaurant" onClick={this.changeFoodType}>Restaurant</option>
                            <option value="Cafe" onClick={this.changeFoodType}>Cafe</option>
                            <option value="Bar" onClick={this.changeFoodType}>Bar</option>
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