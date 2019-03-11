import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { Link, Redirect } from 'react-router-dom';

import AddForm from '../../../Forms/AddForm';
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards'
import Button from '../../../../components/utility/button/Button'
import Filter from '../../../../components/utility/filterDropDown/Filter';
import '../../todo.css'

class FoodTodo extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            types: ['Restaurant', 'Cafe', 'Bar', 'Diner'],
            msg: "",
            showAlert: false,
        }
    }

    componentDidMount() {
        axios({
            method: 'POST',
            url: `${window.apiHost}/food/getFoodList`,
            data: {
                email: this.props.login.email
            }
        }).then((foodListFromDB) => {
            this.setState({
                list: foodListFromDB
            })
        })
    }

    addNewPlace = (place, type, text) => {
        // possibly, api call will go here with autocomplete to add name, location to DB
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
            this.setState({
                list: backEndResponse,
                msg: "Success! Added to favorites",
                showAlert: true
            })
        })
    }

    removePlace = (placename) => {
        axios({
            method: "POST",
            url: `${window.apiHost}/food/deletePlace/${placename}`,
            data: {
                email: this.props.login.email
            }
        }).then((backEndResponse) => {
            this.setState({
                list: backEndResponse
            })
        })
    }

    filterResults = (filter) => {
        axios({
            method: 'POST',
            url: `${window.apiHost}/food/filter/${filter}`,
            data: {
                type: filter,
                email: this.props.login.email
            }
        }).then((backEndResponse) => {
            this.setState({
                list: backEndResponse
            })
        })
    }

    clearFilter = () => {
        axios({
            method: 'POST',
            url: `${window.apiHost}/food/getFoodList`,
            data: {
                email: this.props.login.email
            }
        }).then((foodListFromDB) => {
            this.setState({
                list: foodListFromDB
            })
        })
    }

    render() {
        let category = "food";
        let section = "todo";
        if (this.state.list.data !== undefined) {
            var foodToDo = this.state.list.data.map((food, i) => {
                return (
                    <div key={i} className="placeCard">
                        <div className="cardLeft">
                            <h4>{food.placename}</h4>
                            <div>
                                <p>{food.note}</p>
                            </div>
                        </div>
                        <div className="buttonContainer">
                            <Button clicked={() => this.addToFavorites(food.placename)} className="faveButton">Fave</Button>
                            <Button className="editButton"><Link to={"/userHome/"+ category + "/edit/" + section + "/" + food.placename} >Edit</Link></Button>
                            <Button clicked={() => this.removePlace(food.placename)} className="deleteButton">Remove</Button>
                        </div>
                    </div>
                )
            })
        }

        const typeArray = this.state.types.map((type, i)=>{
            return (<option key={i} value={type}>{type}</option>)
        })
        const filterArray = this.state.types.map((filter, i)=>{
            return(<option key={i} value={filter}>{filter}</option>)
        })
        
        if(this.props.login.length === 0){
            return (
                <Redirect to="/login"/>
            )
        } else {
            return (
                <div className="ToDo">
                    <h2>Places I'd like to try:</h2>
                    <SweetAlert
                        show={this.state.showAlert}
                        title="Added to Faves"
                        text={this.state.msg}
                        onConfirm={() => this.setState({ showAlert: false })}
                    />
                    <div className="todoBody">
                        <div className="todoLeft">
                            <AddForm
                                title="Add to your list!"
                                addNewPlace={this.addNewPlace}
                                placeholder="Add new place to eat..."
                                defaultType="Choose type!"
                                textType="Add note..."
                                types={typeArray}
                            />
                        </div>
                        <div className="todoRight">
                            <Filter 
                                defaultFilter="Filter by type"
                                defaultValue={this.state.types[0]}
                                filters={filterArray}
                                filterResults={this.filterResults}
                                clearFilter={this.clearFilter}
                            />
                            <PlaceCards cards={foodToDo}/>
                        </div>
                    </div>
                </div>
            )
        }
        }
    }

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps, null)(FoodTodo);