import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import AddForm from '../../../Forms/AddForm';
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards'
import Button from '../../../../components/utility/button/Button'
import "./FoodFavorites.css";

class FoodFavorites extends Component {
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
                url: `${window.apiHost}/food/getFoodFaveList`,
                data: {
                    email: this.props.login.email
                }
            }).then((foodListFromDB) => {
                console.log('logged in')
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
                url: `${window.apiHost}/food/addFaveInFavorites`,
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
    
    
        removePlace = (placename) => {
            //easy, just delete from DB!
            console.log(this.props.login.email)
            axios({
                method: "POST",
                url: `${window.apiHost}/food/deleteFavePlace/${placename}`,
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
            console.log(this.props)
            if (this.state.list.data !== undefined) {

                var favorites = this.state.list.data.map((food, i) => {

                    console.log(food)
                    return (
                        <div key={i} className="placeCard">
                            <h4>{food.placename}</h4>
                            <div>
                                <p>{food.note}</p>
                            </div>
                            <div className="buttonContainer">
                            <Button clicked={() => this.setState({ showAlert: true })} className="reviewButton">Review</Button>
                            <Button clicked={() => this.editPlace(food.placename)} className="editButton">Edit</Button>
                            <Button clicked={() => this.removePlace(food.placename)} className="deleteButton">Remove</Button>
                            </div>
                            
                        </div>
                    )
                })
            }
            
    
            return (
                <div className="FoodFavorites">
                    <h2>Favorites</h2>
                    <AddForm
                        addNewPlace={this.addNewPlace}
                        placeholder="Add new..."
                        textType="Add note..."
                        defaultType="Restaurant"
                        type2="Cafe"
                        type3="Bar"
                        type4="Diner"
                    
                    />
                    <PlaceCards cards={favorites}/>

                </div>
            )
        }
    }
    
    function mapStateToProps(state) {
        return {
            login: state.login
        }
    }
    
    export default connect(mapStateToProps, null)(FoodFavorites);