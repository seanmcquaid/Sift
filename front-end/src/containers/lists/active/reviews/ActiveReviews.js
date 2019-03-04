import React, { Component } from 'react';

class ActiveReviews extends Component {
    constructor() {
        super()
        this.state = {
            activity: '',
            stars: '',
            review: ''

        }
    }

    render(){
        return (
            <div className="ActiveReview">
                <div>
                    <form onSubmit={this.addActiveReview} className="ReviewForm">
                        <input onChange={this.changeActivityName} type="text" id="NewActiveReview" placeholder="Add activity to review" value={this.state.activity} />
                        <input onChange={this.changeActiveReview} type="text" id="ActiveReviewText" placeholder="Type review here!" value={this.state.review} />
                        <select className="Stars" value={this.state.stars}>
                            <option default value="5" onClick={}>5 Stars</option>
                            <option value="4" onClick={}>4 Stars</option>
                            <option value="3" onClick={}>3 Stars</option>
                            <option value="2" onClick={}>2 Stars</option>
                            <option value="1" onClick={}>1 Star</option>
                        </select>
                    </form>
                </div>
                <div>
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>Activity</th>
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


export default ActiveReviews;