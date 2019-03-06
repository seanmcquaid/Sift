import React, { Component } from 'react'


class List extends Component {


    render(){
        return (
            <div className="ToDo" >
                <table className="Table">
                    <thead>
                        <tr>
                            <th col1={this.props.col1}>{this.props.col1}</th>
                            <th col2={this.props.col2}>{this.props.col2}</th>
                            <th col3={this.props.col3}>{this.props.col3}</th>
                            <th col4={this.props.col4}>{this.props.col4}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.toDoList}
                    </tbody>
                </table>
            </div>
        )
    } 
}

export default List;

    




