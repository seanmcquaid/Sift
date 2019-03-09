import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import AddForm from '../../../Forms/AddForm';
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards'
import Button from '../../../../components/utility/button/Button'
import "./CultureFavorites.css";
import Filter from '../../../../components/utility/filterDropDown/Filter';

class CultureFavorites extends Component {
        constructor() {
            super()
            this.state = {
                list: [],
                msg: "",
                types: ['Music', 'Art', 'Theater', 'Festival'],
                showAlert: false,
            }
        }
    
        componentDidMount() {
            // console.log('component did mount')
            axios({
                method: 'POST',
                url: `${window.apiHost}/culture/getCultureFaveList`,
                data: {
                    email: this.props.login.email
                }
            }).then((cultureListFromDB) => {
                    this.setState({
                        list: cultureListFromDB
                    })
                })
        }
    
        addNewPlace = (place, type, text) => {
            //api call will go here with autocomplete to add name, location to DB
            // console.log(place, type)
            axios({
                method: 'POST',
                url: `${window.apiHost}/culture/addFaveInFavorites`,
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
    
    
        removePlace = (placename) => {
            //easy, just delete from DB!
            console.log(this.props.login.email)
            axios({
                method: "POST",
                url: `${window.apiHost}/culture/deleteFavePlace/${placename}`,
                data: {
                    email: this.props.login.email
                }
            }).then((backEndResponse) => {
                // console.log(backEndResponse)
                this.setState({
                    list: backEndResponse
                })
            })
        }

        filterResults = (filter) => {
            console.log(filter)
            axios({
                method: 'POST',
                url: `${window.apiHost}/culture/faveFilter/${filter}`,
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
            // console.log(this.props)
            if (this.state.list.data !== undefined) {

                var favorites = this.state.list.data.map((culture, i) => {
                    return (
                        <div key={i} className="placeCard">
                            <h4>{culture.placename}</h4>
                            <div>
                                <p>{culture.note}</p>
                            </div>
                            <div className="buttonContainer">
                            <Button clicked={() => this.setState({ showAlert: true })} className="reviewButton">Review</Button>
                            <Button clicked={() => this.editPlace(culture.placename)} className="editButton">Edit</Button>
                            <Button clicked={() => this.removePlace(culture.placename)} className="deleteButton">Remove</Button>
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
                <div className="CultureFavorites">
                    <h2>Favorites</h2>
                    <AddForm
                        addNewPlace={this.addNewPlace}
                        placeholder="Add a new experience..."
                        textType="Add note..."
                        defaultType="Choose type!" 
                        types={typeArray}
                    />
                    <Filter 
                        defaultFilter="Filter by type"
                        filters={filterArray}
                        filterResults={this.filterResults}
                    />
                    <PlaceCards cards={favorites}/>

                </div>
            )
        }
    }
    
    function mapStateToProps(state) {
        return {
            login: state.login
        }
    }
    
    export default connect(mapStateToProps, null)(CultureFavorites);