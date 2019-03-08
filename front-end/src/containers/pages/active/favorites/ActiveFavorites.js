import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import AddForm from '../../../Forms/AddForm';
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards'
import Button from '../../../../components/utility/button/Button'
import "./ActiveFavorites.css";
import Filter from '../../../../components/utility/filterDropDown/Filter';

class ActiveFavorites extends Component {
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
        axios({
            method: 'POST',
            url: `${window.apiHost}/active/getActiveFaveList`,
            data: {
                email: this.props.login.email
            }
        }).then((activeListFromDB) => {
            this.setState({
                list: activeListFromDB
            })
        })
    }

    addNewActive = (activity, type, text) => {
        //api call will go here with autocomplete to add name, location to DB
        axios({
            method: 'POST',
            url: `${window.apiHost}/active/addFaveInFavorites`,
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

    removeActive = (activity) => {
        console.log(this.props.login.email)
        axios({
            method: "POST",
            url: `${window.apiHost}/active/deleteFavePlace/${activity}`,
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
            url: `${window.apiHost}/active/faveFilter/${filter}`,
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
            this.setState({
                list: activeListFromDB
            })
        })
    }

    render() {

        const typeArray = this.state.types.map((type, i) => {
            return (<option key={i} value={type}>{type}</option>)
        })

        const filterArray = this.state.types.map((filter, i) => {
            return (<option key={i} value={filter}>{filter}</option>)
        })

        if (this.state.list.data !== undefined) {
            var favorites = this.state.list.data.map((activity, i) => {
                return (
                    <div key={i} className="placeCard">
                        <h4>{activity.placename}</h4>
                        <div>
                            <p>{activity.note}</p>
                        </div>
                        <div className="buttonContainer">
                            <Button clicked={() => this.setState({ showAlert: true })} className="reviewButton">Review</Button>
                            <Button clicked={() => this.editPlace(activity.placename)} className="editButton">Edit</Button>
                            <Button clicked={() => this.removePlace(activity.placename)} className="deleteButton">Remove</Button>
                        </div>

                    </div>
                )
            })
        }


        return (
            <div className="ActiveFavorites">
                <h2>Favorites</h2>
                <AddForm
                    addNewActive={this.addNewActive}
                    placeholder="Add new favorite activity..."
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
                <PlaceCards cards={favorites} />

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps, null)(ActiveFavorites);
