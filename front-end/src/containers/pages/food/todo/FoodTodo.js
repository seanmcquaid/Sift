import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import AddForm from '../../../Forms/AddForm';
import PlaceCards from '../../../../components/Lists/ToDo/PlaceCards';
import Button from '../../../../components/utility/button/Button';
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
            data: {
                email: this.props.login.email
            }
        }).then((foodListFromDB) => {
            // console.log(foodListFromDB)
            this.setState({
                list: foodListFromDB
            })
        })
    }

    addNewPlace = (place, type, text) => {
        //api call will go here with autocomplete to add name, location to DB
        // console.log(place, type)
        axios({
            method: 'POST',
            url: `${window.apiHost}/food/addFood`,
            data: {
                placename: place,
                type: type,
                note: text,
                email: this.props.login.email
            }
        }).then((backEndResponse) => {
            // console.log(backEndResponse)
            this.setState({
                list: backEndResponse
            })
        })
    }

    addToFavorites = (placename) => {
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

    removePlace = (placename) => {
        //easy, just delete from DB!
        console.log(this.props.login.email)
        axios({
            method: "POST",
            url: `${window.apiHost}/food/deletePlace/${placename}`,
            data: {
                email: this.props.login.email
            }
        }).then((backEndResponse) => {
            console.log(backEndResponse)
            this.setState({
                list: backEndResponse
            })
        })
    }

    render() {
        // console.log(this.props)
        if (this.state.list.data !== undefined) {
            var foodToDo = this.state.list.data.map((food, i) => {
                console.log(food)
                return (
                    <div key={i} className="placeCard">
                        <h4>{food.placename}</h4>
                        <div>
                            <p>{food.note}</p>
                        </div>
                        <div className="buttonContainer">
                            <Button clicked={() => this.addToFavorites(food.placename)} className="faveButton">*</Button>
                            <Button clicked={() => this.removePlace(food.placename)} className="deleteButton">-</Button>
                        </div>
                        
                    </div>
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
                <AddForm
                    addNewPlace={this.addNewPlace}
                    placeholder="Add new..."
                    textType="Add note..."
                    defaultType="Restaurant"
                    type2="Cafe"
                    type3="Bar"
                    type4="Diner"
                />
                <PlaceCards cards={foodToDo}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps, null)(FoodToDo);