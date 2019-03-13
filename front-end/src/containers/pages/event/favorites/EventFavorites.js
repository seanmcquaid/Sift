import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

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
            readabledate:'',
            date:'',
            msg: "",
            showAlert: false,
            swTitle: ''
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
        axios({
            method: 'POST',
            url: `${window.apiHost}/events/addFaveInFavorites`,
            data: {
                eventname: event,
                type: type,
                readabledate:readabledate,
                date: date,
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
        let category = "event";
        let section = "favorites";
        if (this.state.list.data !== undefined) {
            
            document.querySelector(".placeCards").style.backgroundColor = "#ffa094";
            var favorites = this.state.list.data.map((event, i) => {     
                console.log(event)            
                return (
                    <div key={i} className="placeCard">
                        <div className="cardLeft">
                            <h4>{event.eventname}</h4>
                            <p>{event.readabledate}</p>
                            <p>{event.note}</p>
                        </div>
                        <div className="buttonContainer">
                            <Button className="reviewButton"><Link to={"/userHome/"+ category + "/eventReviews/" + section + "/" + event.eventname} >Review</Link></Button>
                            <Button className="editButton"><Link to={"/userHome/" + category + "/editEvent/" + section + "/" + event.eventname} >Edit</Link></Button>
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
                    <h2>Favorite events!</h2>
                    <SweetAlert
                        show={this.state.showAlert}
                        title={this.state.swTitle}
                        text={this.state.msg}
                        onConfirm={() => this.setState({ showAlert: false })}
                    />
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
