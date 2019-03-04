import React, { Component } from 'react';

class FoodReviews extends Component {
    constructor() {
        super()
        this.state = {
            place: '',
            stars: '',
            review: ''

        }
    }

    render() {
        return (
            <div className="FoodReview">
                <div>
                    <form onSubmit={this.addFoodReview} className="ReviewForm">
                        <input onChange={this.changeFoodName} type="text" id="NewReview" placeholder="Restaurant to review" value={this.state.place} />
                        <input onChange={this.changeFoodReview} type="text" id="ReviewText" placeholder="Type review here!" value={this.state.review} />
                        <select className="Dropdown FoodType">
                            <option default value="Restaurant" onClick={}>Restaurant</option>
                            <option value="Cafe" onClick={}>Cafe</option>
                            <option value="Bar" onClick={}>Bar</option>
                        </select>
                    </form>
                </div>
                <div>
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>Place</th>
                                <th>Review</th>
                                <th>Stars</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* JSX for mapped array of activities! */}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default FoodReviews;