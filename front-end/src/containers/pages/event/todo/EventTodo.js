import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { Link, Redirect } from 'react-router-dom';

import AddEventForm from '../../../Forms/AddEventForm'
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards'
import Button from '../../../../components/utility/button/Button'
import Filter from '../../../../components/utility/filterDropDown/Filter';
import '../../todo.css';

class EventTodo extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            types: ['Festival','Arts-Movies-Music', 'Sporting Events', 'Educational'],
            date:'',
            readableDate:'',
            msg: "",
            showAlert: false,
        }
    }

    componentDidMount() {
        axios({
            method: 'POST',
            url: `${window.apiHost}/events/getEventList`,
            data: {
                email: this.props.login.email
            }
        }).then((eventListFromDB) => {
            this.setState({
                list: eventListFromDB
            })
        })
    }

    addNewEvent = (event, type, date,  text) => {
        axios({
            method: 'POST',
            url: `${window.apiHost}/events/addEvent`,
            data: {
                eventname: event,
                type: type,
                date: date,
                note: text,
                email: this.props.login.email
            }
        }).then((backEndResponse) => {
            this.setState({
                list: backEndResponse
            })
        })
    }

    addToFavorites = (eventname) => {
        axios({
            method: "POST",
            url: `${window.apiHost}/events/addFave/${eventname}`,
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

    removeEvent = (eventname) => {
        axios({
            method: "POST",
            url: `${window.apiHost}/events/deleteEvent/${eventname}`,
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
            url: `${window.apiHost}/events/filter/${filter}`,
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
            url: `${window.apiHost}/events/getEventList`,
            data: {
                email: this.props.login.email
            }
        }).then((eventListFromDB) => {
            this.setState({
                list: eventListFromDB
            })
        })
    }

    render() {
        let category = "events";
        let section = "todo";
        if (this.state.list.data !== undefined) {
            var eventToDo = this.state.list.data.map((events, i) => {

                return (
                    <div key={i} className="placeCard">
                         <div className="cardLeft">
                            <h4>{events.eventname}</h4>
                            <p>{events.date}</p>
                            <p>{events.note}</p>
                        </div>
                        <div className="buttonContainer">
                            <Button clicked={() => this.addToFavorites(events.eventname)} className="faveButton">Fave</Button>
                            <Button className="editButton"><Link to={"/userHome/" + category + "/edit/" + section + "/" + events.eventname} >Edit</Link></Button>
                            <Button clicked={() => this.removeEvent(events.eventname)} className="deleteButton">Remove</Button>
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
        
        if (this.props.login.length === 0) {
            return (
                <Redirect to="/login" />
            )
        } else {
            return (
                <div className="ToDo">
                    <h2>Event To Do!</h2>
                    <SweetAlert
                        show={this.state.showAlert}
                        title="Added to Faves"
                        text={this.state.msg}
                        onConfirm={() => this.setState({ showAlert: false })}
                    />
                    <div className="todoBody">
                        <div className="todoLeft">
                            <AddEventForm
                                addNewEvent={this.addNewEvent}
                                placeholder="Add new event..."
                                textType="Add note..."
                                defaultType="Choose type!" 
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
                            <PlaceCards cards={eventToDo} />
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

export default connect(mapStateToProps, null)(EventTodo);