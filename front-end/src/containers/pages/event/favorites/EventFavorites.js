import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import AddEventForm from '../../../Forms/AddEventForm';
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards'
import Button from '../../../../components/utility/button/Button'
import "./EventFavorites.css";
import Filter from '../../../../components/utility/filterDropDown/Filter';

class EventFavorites extends Component {
        constructor() {
            super()
            this.state = {
                list: [],
                types: ['Festival','Arts-Movies-Music', 'Sporting Events', 'Educational'],
                msg: "",
                showAlert: false,
            }
        }
    
        componentDidMount() {
            // console.log('component did mount')
            axios({
                method: 'POST',
                url: `${window.apiHost}/event/getEventFaveList`,
                data: {
                    email: this.props.login.email
                }
            }).then((eventListFromDB) => {
                
                    this.setState({
                        list: eventListFromDB
                    })
                })
        }
    
        addNewEvent = (event, type, date, text) => {
            //api call will go here with autocomplete to add name, location to DB
            // console.log(place, type)
            axios({
                method: 'POST',
                url: `${window.apiHost}/event/addFaveInFavorites`,
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
    
    
        removeEvent = (eventname) => {
            //easy, just delete from DB!
            console.log(this.props.login.email)
            axios({
                method: "POST",
                url: `${window.apiHost}/event/deleteFaveEvent/${eventname}`,
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
                url: `${window.apiHost}/event/faveFilter/${filter}`,
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

        clearFilter = () => {
            axios({
                method: 'POST',
                url: `${window.apiHost}/event/getEventFaveList`,
                data: {
                    email: this.props.login.email
                }
            }).then((eventListFromDB) => {
                // console.log(eventListFromDB)
                this.setState({
                    list: eventListFromDB
                })
            })
        }

  
       
        render() {
            let category = "event";
            let section = "favorites";
            console.log(this.props)
            if (this.state.list.data !== undefined) {

                var favorites = this.state.list.data.map((event, i) => {                 

                    return (
                        <div key={i} className="placeCard">
                            <div>
                                <h4>{event.eventname}</h4>
                                <p>{event.date}</p>
                                <p>{event.note}</p>
                            </div>
                            <div className="buttonContainer">
                            <Button className="reviewButton"><Link to={"/userHome/"+ category + "/eventReviews/" + section + "/" + event.eventname} >Review</Link></Button>
                            <Button clicked={() => this.editPlace(event.eventname)} className="editButton">Edit</Button>
                            <Button clicked={() => this.removeEvent(event.eventname)} className="deleteButton">Remove</Button>
                            
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
                    <div className="eventFavorites">
                        <div className="formRows">
                            <AddEventForm
                                addNewEvent={this.addNewEvent}
                                placeholder="Add new..."
                                textType="Add note..."
                                defaultType="Festival"
                                types={typeArray}
                            />
                        </div>
                        <div className="formRows">
                            <Filter 
                                defaultFilter="Filter by type"
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
    
    function mapStateToProps(state) {
        return {
            login: state.login
        }
    }
    
    export default connect(mapStateToProps, null)(EventFavorites);
