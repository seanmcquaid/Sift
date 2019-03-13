import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';

import AddEventForm from '../../../Forms/AddEventForm'
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards';
import Button from '../../../../components/utility/button/Button'
import Filter from '../../../../components/utility/filterDropDown/Filter';
import '../../favorites.css';

class EventFavorites extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            types: ['Festival','Arts-Movies-Music', 'Sporting Events', 'Educational'],
            date:'',
            readabledate:'',
            msg: "",
            showAlert: false,
        }
    }

    componentDidMount() {
        axios({
            method: 'POST',
            url: `${window.apiHost}/events/getEventFaveList`,
            data: {
                email: this.props.login.email
            }
        }).then((eventListFromDB) => {
                this.setState({
                    list: eventListFromDB
                })
            })
    }

    addNewEvent = (event, type, date, readabledate, text) => {
        //api call will go here with autocomplete to add name, location to DB
        axios({
            method: 'POST',
            url: `${window.apiHost}/events/addFaveInFavorites`,
            data: {
                eventname: event,
                type: type,
                date: date,
                readabledate:readabledate,
                note: text,
                email: this.props.login.email
            }
        }).then((backEndResponse) => {
            this.setState({
                list: backEndResponse
            })
        })
    }


    removeEvent = (eventname) => {
        axios({
            method: "POST",
            url: `${window.apiHost}/events/deleteFaveEvent/${eventname}`,
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
            url: `${window.apiHost}/events/faveFilter/${filter}`,
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
            url: `${window.apiHost}/events/getEventFaveList`,
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
        let section = "favorites";
        if (this.state.list.data !== undefined) {
            var favorites = this.state.list.data.map((event, i) => {                 
                return (
                    <div key={i} className="placeCard">
                        <div className="cardLeft">
                            <h4>{event.eventname}</h4>
                            <p>{event.readabledate}</p>
                            <p>{event.note}</p>
                        </div>
                        <div className="buttonContainer">
                            <Button className="reviewButton"><Link to={"/userHome/"+ category + "/eventReviews/" + section + "/" + event.eventname} >Review</Link></Button>
                            <Button className="editButton"><Link to={"/userHome/" + category + "/edit/" + section + "/" + event.eventname} >Edit</Link></Button>
                            <Button clicked={() => this.removeEvent(event.eventname)} className="deleteButton">Remove</Button>
                        </div>   
                    </div>
                )
            })
        }

        const typeArray = this.state.types.map((type, i) => {
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
                <div className="Favorites">
                    <h2>Favorites</h2>
                    <div className="faveBody">
                        <div className="faveLeft">
                            <AddEventForm
                                addNewEvent={this.addNewEvent}
                                placeholder="Add new..."
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
                            <PlaceCards cards={favorites}/>
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

export default connect(mapStateToProps, null)(EventFavorites);
