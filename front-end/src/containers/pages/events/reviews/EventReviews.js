import React, { Component } from 'react';

class CultureReviews extends Component {
    constructor() {
        super()
        this.state = {
            event: '',
            stars: '',
            review: ''

        }
    }

    render() {
        return (
            <div className="EventReview">
                <div>
                    <form onSubmit={this.addEventReview} className="ReviewForm">
                        <input onChange={this.changeEventName} type="text" id="NewReview" placeholder="Place to review" value={this.state.event} />
                        <input onChange={this.changeEventReview} type="text" id="ReviewText" placeholder="Type review here!" value={this.state.review} />
                        <select className="Dropdown EventType">
                            <option default value="Festival" onClick={}>Festival</option>
                            <option value="Cultural" onClick={}>Arts/Movies/Music</option>
                            <option value="Outdoors" onClick={}>Sports/Outdoors</option>
                            <option value="Educational" onClick={}>Educational</option>
                        </select>
                    </form>
                </div>
                <div>
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>Event</th>
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


export default CultureReviews;