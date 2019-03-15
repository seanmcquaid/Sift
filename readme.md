# Sift
![Main Page](./screenshots/main.png)

## Contents
* Description
* Technologies
* Challenges and Solutions
* MVP
* Stretch Goals
* Authors

## Description
Sift is a PERN stack web application that allows users to organize their leisure acitivities by category. Once the user is in that category, they are able to create to do lists with notes, create favorite lists and write their own personal reviews.


## Features
* Users can categorize their lists based on whether it falls into any of the following categories:
    * Food
    * Active
    * Events
    * Culture
* The user has the ability to search within each category for potential activities and the option to add them to their todo or favorties list
* The user is able to add, edit or remove item from their todo and favorites lists
* The user can write personal reviews about their favorite places allowing them to keep a record of their favorite experiences for each location

## Technologies
- React/Redux
- HTML/CSS/JavaScript
- Node.js/Express
- PostgreSQL
- Google Maps/Places API


## Challenges & Solutions
* Edit - Katie and Sean
    * We struggled to come up with a solution that allowed us to pass data to the Edit page so the form would autopopulate with the selected place to edit without using Redux. We knew that using Redux wasn't necessarily needed or appropriate in this situation. So after doing a bit of research, we discovered that you could use Params on the Front End in Link components. This was an aboslute game changer and allowed us to easily create a way to grab information about the specified place to edit.
    ```
    componentDidMount() {
        const placename = this.props.match.params.place;
        const section = this.props.match.params.section;
        const category = this.props.match.params.category;
        axios({
            method: 'POST',
            url: `${window.apiHost}/${category}/${section}/getPlaceToEdit/${placename}`,
            data: {
                email: this.props.login.email
            }
        }).then((responseFromDB) => {
            let textFromDB = responseFromDB.data.note || responseFromDB.data.review
            let placeFromDB = responseFromDB.data.placename || responseFromDB.data.eventname
            let starsFromDB = responseFromDB.data.stars 
            this.setState({
                place : placeFromDB,
                category : category,
                type : responseFromDB.data.type,
                text : textFromDB,
                stars: starsFromDB
            })
        })
    }
    ```

* Reusable Routing / Redirect Issues - Sean
    * Previously, we only knew how to handle redirects in Express. Now with the React Router, we were able to create dynamic routes that would use params so our backend could be more flexible between categories. In addition, we used the Redirect component to handle if the user was not logged in and tried to access a page that should only be available to a logged in user.
    * Front End:
    ```
    <Link to={"/userHome/"+ category + "/edit/" + section + "/" + food.placename} >Edit</Link>
    ```
    * Back End: 
    ```
    router.post('/:section/getPlaceToEdit/:placename',(req, res, next)=>{
        ....
    }
    ```

* Events - Greg
    *

* UI/UX Overhaul - Katie
    *

* Debugging - ALL 
    *

* Deploying - ALL 
    *


## MVP
- Food 


## Stretch Goals
- Implement more categories - Active, Culture and Events


## Authors
* Sean McQuaid
  * Contributions: Login and registration connection, implementation of Redux, implentation of Router, routing for redirects, responsive design, mobile navigation,front and backend code for 'Reviews' list and 'Culture' section,
  * [GitHub Profile](https://github.com/seanmcquaid)

* Katie Duane
  * Contributions: Logo design, database schema set-up, creation of re-usable React Components for each category, initialized database connection, CSS debugging, front and backend code for 'To-Do' list and 'Active' section,
  * [GitHub Profile](https://github.com/katiejduane)
  
* Greg Roques
  * Contributions: Wireframes, designs, and style guide, mark-up and CSS for splash and home pages, CSS animations, router debugging, front and backend code for 'Favorites' list and 'Event' section,
  * [GitHub Profile](https://github.com/gregroques)

## Screenshots
