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
import '../../favorites.css';

class ActiveFavorites extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            types: ['Outdoors', 'Fitness', 'Sports', 'Trips'],
            msg: "",
            swTitle: "",
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
            if (backEndResponse.data.length === 0) {
                this.setState({
                    showAlert: true,
                    swTitle: "Whoops!",
                    msg: "This is already in one of your lists!"
                })
            } else {
                this.setState({
                    list: backEndResponse,
                })
            }
        })
    }


    removePlace = (activity) => {
        axios({
            method: "POST",
            url: `${window.apiHost}/active/deleteFavePlace/${activity}`,
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

    render() {


        const typeArray = this.state.types.map((type, i) => {
            return (<option key={i} value={type}>{type}</option>)
        })

        const filterArray = this.state.types.map((filter, i) => {
            return (<option key={i} value={filter}>{filter}</option>)
        })

        let category = "active";
        let section = "favorites";


        if (this.state.list.data !== undefined) {
            document.querySelector(".placeCards").style.backgroundColor = "#ffa094";
            var favorites = this.state.list.data.map((activity, i) => {
                return (
                    <div key={i} className="placeCard">
                        <div className="cardLeft">
                            <h4>{activity.placename}</h4>
                            <p>{activity.note}</p>
                        </div>
                        <div className="buttonContainer">
                            <Button className="reviewButton"><Link to={"/userHome/"+ category + "/reviews/" + section + "/" + activity.placename} >Review</Link></Button>
                            <Button className="editButton"><Link to={"/userHome/" + category + "/edit/" + section + "/" + activity.placename} >Edit</Link></Button>
                            <Button clicked={() => this.removePlace(activity.placename)} className="deleteButton">Remove</Button>
                        </div>
                    </div>
                )
            })
        }


        if (this.props.login.length === 0) {
            return (
                <Redirect to="/login" />
            )
        } else {
            return (
                <div className="Favorites">
                    <h2>Favorite adventures!</h2>
                    <SweetAlert
                        show={this.state.showAlert}
                        title={this.state.swTitle}
                        text={this.state.msg}
                        onConfirm={() => this.setState({ showAlert: false })}
                    />
                    <div className="faveBody">
                        <div className="faveLeft">
                            <AddForm
                                title="Add a favorite thing to do!"
                                addNewPlace={this.addNewActive}
                                placeholder="Add new favorite activity..."
                                textType="Add note..."
                                defaultType="Choose type!"
                                types={typeArray}
                            />
                        </div>
                        <div className="faveRight">
                            <Filter
                                defaultFilter="Filter by type"
                                defaultValue={this.state.types[0]}
                                filters={filterArray}
                                filterResults={this.filterResults}
                                clearFilter={this.clearFilter}
                            />
                            <PlaceCards cards={favorites} />
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

export default connect(mapStateToProps, null)(ActiveFavorites);
