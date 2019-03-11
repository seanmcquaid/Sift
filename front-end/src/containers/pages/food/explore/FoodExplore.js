import React, {Component} from "react";
import ExploreForm from "../../../Forms/ExploreForm";
import "./FoodExplore.css"

class FoodExplore extends Component {


    exploreRequest = (name,city)=>{
      
        var request = {
          query: `${name} + " " + ${city} `,
          fields: ['name', "geometry"],
        };

        // USE WINDOW TO ACCESS GOOGLE 
      
        var service = new window.google.maps.places.PlacesService(document.createElement('div'));
      
        service.findPlaceFromQuery(request, function(results, status) {
            console.log(results[0].geometry.location.lat())
        });
    }

    render(){
        return (
            <div className="Explore">
                    <h2>Explore That Food therrreeeee</h2>
                    <div className="exploreBody">
                        <div className="exploreLeft">
                            {/* explore form component for searching */}
                            <ExploreForm
                            searchPlaceholder="What would you like to eat?"
                            locationPlaceholder="Enter city and state"
                            exploreRequest={this.exploreRequest}
                            />
                        </div>
                        <div className="exploreRight">
                            {/* placecards that will display name,  */}
                            {/* <PlaceCards cards={} /> */}
                        </div>
                    </div>
                </div>
        )
    }
}

export default FoodExplore;