import React, { Component } from 'react';

class ActiveTodo extends Component {
    constructor(){
        super()
        this.state = {
            activity: '',
            type: '',

        }
    }

    render(){
        // in the logic for mapping through the data to make the table, we need to be SURE that the favorites button can be clicked to add the item
        // to the favorites and remove it from this table

       return (
            <div className="ActiveTodo">
                <div className="Search">
                    <form onSubmit={this.addNewActive} className="TodoForm">
                        <input onChange = {this.changeActive} type="text" id="NewActive" placeholder="Add activity" value={this.state.activity} />
                        <select className="ActiveType">
                            <option default value="Outdoors" onClick={}>Outdoors</option>
                            <option value="Fitness" onClick={}>Fitness</option>
                            <option value="Sports" onClick={}>Sports</option>
                            <option value="Trips" onClick={}>Trips</option>
                        </select>
                    </form>
                </div>
                <div>
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>Activity</th>
                                <th>Type</th>
                                <th>Remove</th>
                                <th>Favorite</th>
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





export default ActiveTodo;