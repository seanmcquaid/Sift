import React, {Component} from "react";
import { connect } from "react-redux";
import ExploreForm from "../../../Forms/ExploreForm";
import axios from "axios";
import config from "../../../../config";
// import {Redirect} from 'react-router-dom';
import '../../Explore.css'
import Button from "../../../../components/utility/button/Button";
import PlaceCards from "../../../../components/Lists/PlaceCards/PlaceCards";

class ActiveExplore extends Component {
    constructor(){
        super()
        this.state = {
            exploreResults : [],
            types: ['Outdoors', 'Fitness', 'Sports', 'Trips'],
            showAlert: false,

        }
    }


    exploreRequest = (name,city)=>{
        let cityCoordinates, searchLat, searchLon;
        const locationComma = city.replace(/,/g,"");
        const locationFinalFormat = locationComma.replace(/ /g,"+");
        const addressToCoordinatesUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${locationFinalFormat}&key=${config.apiKey}`;
        axios({
            method : "GET",
            url : addressToCoordinatesUrl
        }).then((response)=>{
            searchLat =  response.data.results[0].geometry.location.lat
            searchLon =  response.data.results[0].geometry.location.lng;
            cityCoordinates = {
                lat : searchLat,
                lng : searchLon
            }

            let request = {
              query: `${name}`,
              rankby : "distance",
              location : cityCoordinates,
              radius: 10000
            };
    
            // USE WINDOW TO ACCESS GOOGLE 
          
            let service = new window.google.maps.places.PlacesService(document.createElement('div'));
            let searchResults = [];
            service.textSearch(request, (results, status)=> {
                let loopLength;
                if (20 < results.length){
                    loopLength = 20
                } else {
                    loopLength = results.length
                }

                for(let i = 0; i < loopLength; i++) {
                    searchResults.push(results[i])
                }
                
                this.setState({
                    exploreResults : searchResults
                })
            });
        })
        document.querySelector(".placeCards").style.visibility = "visible";
    }

    addExploreTodo = (place, type, text) => {
        const email = this.props.login.email;
        axios({
            method: 'POST',
            url: `${window.apiHost}/active/addExploreTodo`,
            data: {
                place,
                type,
                text,
                email
            }
        }).then((backEndResponse) => {
            if(backEndResponse.data.msg === "added"){
                this.props.history.push("/userHome/active/todo")
            }
        })
    }

    addExploreFavorite = (place, type, text)=>{
        const email = this.props.login.email;
        axios({
            method: 'POST',
            url: `${window.apiHost}/active/addExploreFavorite`,
            data: {
                place,
                type,
                text,
                email
            }
        }).then((backEndResponse) => {
            if(backEndResponse.data.msg === "added"){
                this.props.history.push("/userHome/active/favorites")
            }
        })

    }

    render(){
        const exploreResults = this.state.exploreResults.map((place, i)=>{
            const typeArray = this.state.types;
            const exploreTypeArray = place.types;
            let type;
            for(let i =0; i < typeArray.length; i++){
                for(let j = 0; j < exploreTypeArray.length; j++){
                    if(typeArray[i].toLowerCase() === exploreTypeArray[j]){
                        type = typeArray[i]
                    }
                }
            }
            
            if(type === undefined){
                type = "Outdoors"
            }
            
            
            return (
                <div key={i} className="placeCard">
                    <div className="cardLeft">
                        <h4>{place.name}</h4>
                        <p>{type}</p>
                    </div>
                    <div className="buttonContainer">
                        <Button clicked={() => this.addExploreTodo(place.name, type, place.formatted_address)} className="todoButton">Todo</Button>
                        <Button clicked={() => this.addExploreFavorite(place.name, type, place.formatted_address)} className="faveButton">Favorite</Button>
                    </div> 
                </div>
                )
            })
        return (
            <div className="Explore">
                <h2>Explore the world around you!</h2>
                <div className="exploreBody">
                    <div className="exploreLeft">
                        <ExploreForm
                        searchPlaceholder="What would you like to do?"
                        locationPlaceholder="Enter city and state"
                        exploreRequest={this.exploreRequest}
                        />
                    </div>
                    <div className="exploreRight">
                        <PlaceCards cards={exploreResults} />
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

export default connect(mapStateToProps, null)(ActiveExplore);