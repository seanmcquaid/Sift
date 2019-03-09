import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

import './ActiveTodo.css'
import AddForm from '../../../Forms/AddForm';
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards'
import Button from '../../../../components/utility/button/Button'
import Filter from '../../../../components/utility/filterDropDown/Filter';


class ActiveTodo extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            types: ['Outdoors', 'Fitness', 'Sports', 'Trips'],
            msg: "",
            showAlert: false,
        }
    }

    componentDidMount() {
        // console.log('component did mount')
        axios({
            method: 'POST',
            url: `${window.apiHost}/active/getActiveList`,
            data: {
                email: this.props.login.email
            }
        }).then((activeListFromDB) => {
            // console.log(activeListFromDB)
            this.setState({
                list: activeListFromDB
            })
        })
    }

    addNewActive = (activity, type, text) => {
        // possibly, api call will go here with autocomplete to add name, location to DB
        // console.log(place, type)
        axios({
            method: 'POST',
            url: `${window.apiHost}/active/addActive`,
            data: {
                placename: activity,
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

    addToFavorites = (activity) => {
        axios({
            method: "POST",
            url: `${window.apiHost}/active/addFave/${activity}`,
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

    editActive = (activity, type, text) => {
        axios({
            method: 'POST',
            url: `${window.apiHost}/active/edit/${activity}`,
            data: {
                placename: activity,
                type: type,
                note: text,
                email: this.props.login.email
            }
        }).then((backEndResponse) => {
            this.setState({
                list: backEndResponse,
                showModal: true
            })
            if (backEndResponse.data.msg === 'updated') {
                this.props.history.push('/active/todo')
            }
        })
    }

    removeActive = (activity) => {
        console.log(this.props.login.email)
        axios({
            method: "POST",
            url: `${window.apiHost}/active/deleteActive/${activity}`,
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
            url: `${window.apiHost}/active/filter/${filter}`,
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
            url: `${window.apiHost}/active/getActiveList`,
            data: {
                email: this.props.login.email
            }
        }).then((activeListFromDB) => {
            // console.log(activeListFromDB)
            this.setState({
                list: activeListFromDB
            })
        })
    }

    render() {
        if (this.state.list.data !== undefined) {
            var activeTodo = this.state.list.data.map((activity, i) => {
                console.log(activity)
                return (
                    <div key={i} className="placeCard">
                        <div className="cardLeft">
                            <h4>{activity.placename}</h4>
                            <div>
                                <p>{activity.note}</p>
                            </div>
                        </div>
                        <div className="buttonContainer">
                            <Button clicked={() => this.addToFavorites(activity.placename)} className="faveButton">Fave</Button>
                            <Button clicked={() => this.editActive(activity.placename)} className="editButton">Edit</Button>
                            <Button clicked={() => this.removeActive(activity.placename)} className="deleteButton">Remove</Button>
                        </div>

                    </div>
                )
            })
        }

        const typeArray = this.state.types.map((type, i) => {
            return (<option key={i} value={type}>{type}</option>)
        })

        const filterArray = this.state.types.map((filter, i) => {
            return (<option key={i} value={filter}>{filter}</option>)
        })


        return (
            <div className="ActiveTodo">
                <h2>Active To Do!</h2>
                <SweetAlert
                    show={this.state.showAlert}
                    title="Added to Faves"
                    text={this.state.msg}
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                <div className="todoBody">
                    <div className="todoLeft">
                        <AddForm
                            addNewPlace={this.addNewActive}
                            placeholder="Add new activity..."
                            textType="Add note..."
                            defaultType="Choose type!"
                            types={typeArray}
                        />
                    </div>
                    <div className="todoRight">
                        <Filter
                            defaultFilter="Filter by type"
                            filters={filterArray}
                            filterResults={this.filterResults}
                            clearFilter={this.clearFilter}
                        />
                        <PlaceCards cards={activeTodo} />
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

export default connect(mapStateToProps, null)(ActiveTodo);


