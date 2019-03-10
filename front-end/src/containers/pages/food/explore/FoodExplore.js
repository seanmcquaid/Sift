import React, {Component} from "react";
import axios from "axios";
import config from "../../../../config";

class FoodExplore extends Component {


    apiRequest = (name,city,fields)=>{
        // fields ideas = formatted address, place id
        const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name+city}&inputtype=textquery&fields=${fields}&key=${config.apiKey}`
    }

    render(){
        return (
            <div className="Explore">
                    <h2>Explore That Food therrreeeee</h2>
                    <div className="exploreBody">
                        <div className="exploreLeft">
                            {/* explore form component for searching */}
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