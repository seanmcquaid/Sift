import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import AddForm from '../../../Forms/AddForm';
import PlaceCards from '../../../../components/Lists/PlaceCards/PlaceCards'
import Button from '../../../../components/utility/button/Button'
import "./CultureFavorites.css";

class CultureFavorites extends Component {
        constructor() {
            super()
            this.state = {
                list: [],
                msg: "",
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
            
    
            return (
                <div className="CultureFavorites">
                    <h2>Favorites</h2>
                    <AddForm
                        addNewPlace={this.addNewPlace}
                        placeholder="Add new..."
                        textType="Add note..."
                        defaultType="Restaurant"
                        type2="Cafe"
                        type3="Bar"
                        type4="Diner"
                    
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