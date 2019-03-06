import React, { Component } from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import SearchAddForm from '../../../Forms/SearchAddForm';
import List from '../../../../components/Lists/ToDo/List';
import Button from '../../../../components/utility/button/Button';
import config from "../../../../config";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

class FoodToDo extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            msg: "",
            showAlert: false,  
        }
    }

    componentDidMount() {
        // console.log('component did mount')
        axios({
            method: 'POST',
            url: `${window.apiHost}/food/getFoodList`,
            data : {
                email : this.props.login.email
            }
        }).then((foodListFromDB)=>{
            // console.log(foodListFromDB)
            this.setState({
                list: foodListFromDB
            })
        })  
    }

    addNewPlace = (place, type) => {
        //api call will go here with autocomplete to add name, location to DB
        // console.log(place, type)
        axios({
            method: 'POST',
            url: `${window.apiHost}/food/addFood`,
            data: {
                placename: place,
                type: type,
                email : this.props.login.email
            }
        }).then((backEndResponse) => {
            // console.log(backEndResponse)
            this.setState({

                list: backEndResponse

            })
        })
    }

    addToFavorites= (placename)=>{
        axios({
            method: "POST",
            url: `${window.apiHost}/food/addFave/${placename}`,
            data: {
                email: this.props.login.email
            }
        }).then((backEndResponse) => {
            console.log(backEndResponse)
            this.setState({
                list: backEndResponse,
                msg: "Success! Added to favorites",
                showAlert: true
            })
        })
    }

    removePlace = (placename)=>{
        //easy, just delete from DB!
        console.log(this.props.login.email)
        axios({
            method : "POST",
            url : `${window.apiHost}/food/deletePlace/${placename}`,
            data : {
                email : this.props.login.email
            }
        }).then((backEndResponse)=>{
            console.log(backEndResponse)
            this.setState({
                list: backEndResponse
            })
        })
    }

    render() {
        // console.log(this.props)
        console.log(config);
        if(this.state.list.data !== undefined){
            var foodToDo = this.state.list.data.map((food, i) => {
                // console.log(food.placename)
                return (
                    <tr key={i}>
                        <td>{food.placename}</td>
                        <td><Button clicked={()=>this.addToFavorites(food.placename)} className="faveButton">*</Button></td>
                        <td><Button clicked={()=>this.removePlace(food.placename)} className="deleteButton">-</Button></td>
                    </tr>
                )
            })       
        }


        return (
            <div className="FoodToDo">
                <SweetAlert
                    show={this.state.showAlert}
                    title="Add to Faves"
                    text={this.state.msg}
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                <SearchAddForm 
                    addNewPlace={this.addNewPlace}
                    placeholder="Add new..."
                    defaultType="Restaurant"
                    type2="Cafe"
                    type3="Bar"
                    type4="Diner"
                />
                <List //maybe have to make <th> a component to get text to render @ top of table! compare to how
                //the types for drop down work above...
                    col1="Place"
                    col2="Favorite"
                    col3="Remove"
                    list={foodToDo}
                    // can't get the map function to work so i can't see if this passing of props works
                />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        login : state.login
    }
}

export default connect(mapStateToProps,null)(FoodToDo);