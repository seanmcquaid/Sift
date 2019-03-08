import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

import AddForm from '../../../Forms/AddForm';
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards';
import Button from '../../../../components/utility/button/Button';
import './CultureTodo.css';
import Filter from '../../../../components/utility/filterDropDown/Filter';



class CultureToDo extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            types: ['Music', 'Art', 'Theater', 'Festival'],
            msg: "",
            showAlert: false,
        }
    }

    componentDidMount() {
        // console.log('component did mount')
        axios({
            method: 'POST',
            url: `${window.apiHost}/culture/getCultureList`,
            data: {
                email: this.props.login.email
            }
        }).then((cultureListFromDB) => {
            // console.log(foodListFromDB)
            this.setState({
                list: cultureListFromDB
            })
        })
    }

    addNewPlace = (place, type, text) => {
        // possibly, api call will go here with autocomplete to add name, location to DB
        // console.log(place, type)
        axios({
            method: 'POST',
            url: `${window.apiHost}/culture/addCulture`,
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
            url: `${window.apiHost}/culture/addFave/${placename}`,
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

    editPlace = (placename) => {
        //edit note/name of place
    }

    removePlace = (placename) => {
        //easy, just delete from DB!
        // console.log(this.props.login.email)
        axios({
            method: "POST",
            url: `${window.apiHost}/culture/deletePlace/${placename}`,
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
        // console.log(filter)
        axios({
            method: 'POST',
            url: `${window.apiHost}/culture/filter/${filter}`,
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
        if (this.state.list.data !== undefined) {
            var cultureToDo = this.state.list.data.map((culture, i) => {
                console.log(culture)
                return (
                    <div key={i} className="placeCard">
                        <div className="cardLeft">
                            <h4>{culture.placename}</h4>
                            <div>
                                <p>{culture.note}</p>
                            </div>
                        </div>
                        <div className="buttonContainer">
                            <Button clicked={() => this.addToFavorites(culture.placename)} className="faveButton">Fave</Button>
                            <Button clicked={() => this.editPlace(culture.placename)} className="editButton">Edit</Button>
                            <Button clicked={() => this.removePlace(culture.placename)} className="deleteButton">Remove</Button>
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
            <div className="CultureToDo">
                <h2>CultureToDo To Do!</h2>
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
                />
                <PlaceCards cards={cultureToDo}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps, null)(CultureToDo);