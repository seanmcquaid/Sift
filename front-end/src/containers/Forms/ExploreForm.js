import React,{Component} from "react";
import Button from "../../components/utility/button/Button";
import './ExploreForm.css'

class ExploreForm extends Component {
    constructor() {
        super()
        this.state = {
            searchPlace : "",
            searchLocation : "",
        }
    }

    exploreSearch = (event) => {
        event.preventDefault(event)
        this.props.exploreRequest(this.state.searchPlace, this.state.searchLocation)
    }

    changeSearchPlace = (event) => {
        this.setState({
            searchPlace: event.target.value
        })
    }

    changeSearchLocation = (event) => {
        this.setState({
            searchLocation: event.target.value
        })
    }

    render() {

        return (
            <div className="ExploreFormContainer">
                <form onSubmit={this.exploreSearch} className="ExploreForm">
                    {/* <h3 className="addFormTitle">{this.props.title}</h3> */}
                    <div className="addNameAndType">
                        <input onChange={this.changeSearchPlace} type="text" id="NewSearchPlace" placeholder={this.props.searchPlaceholder} value={this.state.searchPlace} required />
                        <input onChange={this.changeSearchLocation} type="text" id="NewSearchLocation" placeholder={this.props.locationPlaceholder} value={this.state.searchLocation} required />
                    </div>
                    
                    <Button type="submit" className="submitButton">Search</Button>
                </form>
            </div>
        )
    }
}

export default ExploreForm;