import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import TrainStation from './components/TrainStation'
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

/* 
    Title : TrainStation
    Author : Dan Storm
    Nashville Software School
    Front End Capstone
    July 1 2018
*/

ReactDOM.render(
    <Router>
        <TrainStation />
    </Router>
    , document.getElementById('root'))