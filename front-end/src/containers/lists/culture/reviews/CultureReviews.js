import React, { Component } from 'react';

class CultureReviews extends Component {
    constructor() {
        super()
        this.state = {
            activity: '',
            stars: '',
            review: ''

        }
    }

    render() {
        return (
            <div className="CultureReview">
                <div>
                    <form onSubmit={this.addCultureReview} className="ReviewForm">
                        <input onChange={this.changeCultureName} type="text" id="NewReview" placeholder="Place to review" value={this.state.activity} />
                        <input onChange={this.changeCultureReview} type="text" id="ReviewText" placeholder="Type review here!" value={this.state.review} />
                        <select className="Dropdown CultureType">
                            <option default value="Museum/Gallery" onClick={}>Museum/Gallery</option>
                            <option value="Performance" onClick={}>Performance</option>
                            <option value="Movies/Music" onClick={}>Movies/Music</option>
                            <option value="Literature/Learning" onClick={}>Literature/Learning</option>
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


export default CultureReviews;