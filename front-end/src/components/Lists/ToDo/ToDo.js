import React, { Component } from 'react'


class ToDo extends Component {


    render(){
        return (
            <div className="ToDo" >
                <table className="Table">
                    <thead>
                        <tr>
                            <th col1={this.props.col1}>props.children</th>
                            <th col2={this.props.col2}>props.children</th>
                            <th col3={this.props.col3}>props.children</th>
                            <th col4={this.props.col4}>props.children</th>
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

export default ToDo;

    




