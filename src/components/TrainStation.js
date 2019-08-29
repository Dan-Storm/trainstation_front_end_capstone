import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import "bootstrap/dist/css/bootstrap.min.css"

/* 
    Title : TrainStation
    Author : Dan Storm
    Nashville Software School
    Front End Capstone
    July 1 2018
*/

class TrainStation extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <ApplicationViews />
            </React.Fragment>
        )
    }
}

export default TrainStation
