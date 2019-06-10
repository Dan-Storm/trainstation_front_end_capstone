import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import TrainStation from './components/TrainStation'

import './index.css'

ReactDOM.render(
    <Router>
        <TrainStation />
    </Router>
    , document.getElementById('root'))