import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

import './FoodTodo.css'
import AddForm from '../../../Forms/AddForm';
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards'
import Button from '../../../../components/utility/button/Button'
import Filter from '../../../../components/utility/filterDropDown/Filter';
import Modal from '../../../../components/utility/modal/Modal';
import EditForm from '../../../Forms/EditForm';



class FoodToDo extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            types: ['Restaurant', 'Cafe', 'Bar', 'Diner'],
            msg: "",
            showAlert: false,
            showModal: false,
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
            console.log(backEndResponse)
            this.setState({
                list: backEndResponse,
                msg: "Success! Added to favorites",
                showAlert: true
            })
        })
    }

    editPlace = (place, type, text) => {
        axios({
            method: 'POST',
            url: `${window.apiHost}/food/edit/${place}`,
            data: {
                placename: place,
                type: type,
                note: text,
                email: this.props.login.email
            }
        }).then((backEndResponse) => {
            this.setState({
                list: backEndResponse,
                showModal: true
            })
            if(backEndResponse.data.msg == 'updated'){
                this.props.history.push('/food/todo')
            }
        })
    }

    removePlace = (placename) => {
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

    filterResults = (filter) => {
        console.log(filter)
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
            // console.log(foodListFromDB)
            this.setState({
                list: foodListFromDB
            })
        })
    }

    render() {
        if (this.state.list.data !== undefined) {
            var foodToDo = this.state.list.data.map((food, i) => {
                console.log(food)
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
                            <Button clicked={() => this.editPlace(food.placename)} className="editButton">Edit</Button>
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
        

        return (
            <div className="FoodToDo">
                <h2>Food To Do!</h2>
                <SweetAlert
                    show={this.state.showAlert}
                    title="Added to Faves"
                    text={this.state.msg}
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                <AddForm
                    addNewPlace={this.addNewPlace}
                    placeholder="Add new place to eat..."
                    textType="Add note..."
                    defaultType="Choose type!" 
                    types={typeArray}
                />
                <Filter 
                    defaultFilter="Filter by type"
                    filters={filterArray}
                    filterResults={this.filterResults}
                    clearFilter={this.clearFilter}
                />
                <PlaceCards cards={foodToDo}/>
                <Modal show={this.state.showModal}>
                    <EditForm />
                </Modal>
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