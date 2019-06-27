import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/workouts">
                Workouts
              </Link>
            </li>
              <Navbar.Brand>
                <img
                  src={require("./Train_Station_Logo_Words.png")}
                  width="222"
                  height="20"
                  className="image"
                  alt="train station logo"
                />
              </Navbar.Brand>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
