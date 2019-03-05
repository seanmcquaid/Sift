import React, { Component } from 'react';
import axios from 'axios';
import ToDoForm from '../../../Forms/ToDoForm';
import ToDo from '../../../../components/Lists/ToDo/ToDo'

class FoodToDo extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            place: '',
            type: '',

        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: `http://localhost:3000/food/getFoodList`
        }).then((foodListFromDB)=>{
            console.log(foodListFromDB)
            this.setState({
                foodList: foodListFromDB
            })
        })  
    }

    addNewPlace = (place, type) => {
        console.log(place, type)
        axios({
            method: 'POST',
            url: 'http://localhost:3000/addFood',
            data: {
                place: this.state.place,
                type: this.state.type
            }
        }).then((backEndResponse) => {
            console.log(backEndResponse)
            this.setState({
                foodList: backEndResponse.data
            })
        })
    }

    addToFavorites(){
        //function to remove from todo list and add to favorites list (will turn 'favorite' boolean to 'true' in db)
        //we will have to think of how to conditionally render the favorites list, and todo (like: if favorites
        // == false, render in to, if favorites == true, render in favorites) because we're not actually deleting
        // this item from the DB, just preventing it from being displayed HERE
    }

    removePlace(){
        //easy, just delete from DB!
    }

    render() {
        // IDK WHY I WAS HAVING SO MUCH TROUBLE GETTING THIS TO WORK!? SAYS IT'S NOT A FUNCTION!?
        // const foodList = {...this.state.list}
        // const foodToDo = foodList.map((food, i)=>{
        //     return(
        //         <tr key={i}>
        //             <td>food.place</td>
        //             <td>food.type</td>
        //             <td><button className="favorite">Favorite</button></td> //THIS BUTTON WILL HAVE
                // A CLICK HANDLER FOR THE ADD TO FAVES FUNCTION ABOVE!
        //             <td><button className="remove">Remove</button></td> //CLICK HANDLER FOR DELETING FROM DB
        //         </tr>
        //     )
        // })
        

        return (
            <div className="FoodToDo">
                <ToDoForm 
                    submitted={this.addNewFood}
                    placeholder="Add new..."
                    defaultType="Restaurant"
                    type2="Cafe"
                    type3="Bar"
                    type4="Diner"
                />
                <ToDo //maybe have to make <th> a component to get text to render @ top of table! compare to how
                //the types for drop down work above...
                    col1="Place"
                    col2="Type"
                    col3="Favorite"
                    col4="Remove"
                    // toDoList={foodToDo}
                    // can't get the map function to work so i can't see if this passing of props works
                />
            </div>
        )
    }
}


export default FoodToDo;