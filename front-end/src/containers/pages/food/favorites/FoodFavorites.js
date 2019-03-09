import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import AddForm from '../../../Forms/AddForm';
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards'
import Button from '../../../../components/utility/button/Button'
import "./FoodFavorites.css";
import Filter from '../../../../components/utility/filterDropDown/Filter';

class FoodFavorites extends Component {
        constructor() {
            super()
            this.state = {
                list: [],
                types: ['Restaurant','Cafe', 'Bar', 'Diner'],
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

        filterResults = (filter) => {
            console.log(filter)
            axios({
                method: 'POST',
                url: `${window.apiHost}/food/faveFilter/${filter}`,
                data: {
                    type: filter,
                    email: this.props.login.email
                }
            }).then((backEndResponse) => {
                // console.log(backEndResponse)
                this.setState({
                    list: backEndResponse
                })
            })
    
        }
       
        render() {
            let category = "food";
            let section = "favorites";
            if (this.state.list.data !== undefined) {

                var favorites = this.state.list.data.map((food, i) => {

                    console.log(food)
                    return (
                        <div key={i} className="placeCard">
                            <div className="placeCardSpacing">
                                <h4>{food.placename}</h4>
                                <p>{food.note}</p>
                            </div>
                            <div className="buttonContainer">
                            <Button className="reviewButton">Review</Button>
                            <Button className="editButton"><Link to={"/userHome/"+ category + "/edit/" + section + "/" + food.placename} >Edit</Link></Button>
                            <Button clicked={() => this.removePlace(food.placename)} className="deleteButton">Remove</Button>
                            </div>
                            
                        </div>
                    )
                })
            }


    
            const filterArray = this.state.types.map((filter, i)=>{
                return(<option key={i} value={filter}>{filter}</option>)
            })
            const typeArray = this.state.types.map((type, i)=>{
                return (<option key={i} value={type}>{type}</option>)
            })
            
            
    
            return (
                <div className="faveTop">
                    <h2>Favorites</h2>
                    <div className="FoodFavorites">
                        <div className="formRows">
                            <AddForm
                                addNewPlace={this.addNewPlace}
                                placeholder="Add new..."
                                textType="Add note..."
                                defaultType="Restaurant"
                                types={typeArray}
                            />
                        </div>
                        <div className="formRows">
                            <Filter 
                                defaultFilter="Filter by type"
                                filters={filterArray}
                                filterResults={this.filterResults}
                            />
                            <PlaceCards cards={favorites}/>
                        </div>
                    </div>
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