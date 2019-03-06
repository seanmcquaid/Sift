import React, { Component } from 'react'


class List extends Component {


    render(){
        return (
            <div className="List" >
                <table className="Table">
                    <thead>
                        <tr>
                            <th col1={this.props.col1}>{this.props.col1}</th>
                            <th col2={this.props.col2}>{this.props.col2}</th>
                            <th col3={this.props.col3}>{this.props.col3}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.list}
                    </tbody>
                </table>
            </div>
        )
    } 
}

export default List;

    




