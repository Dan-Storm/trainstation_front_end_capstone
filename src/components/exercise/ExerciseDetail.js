import React, { Component } from "react"
import "./Exercise.css"

export default class Exercise extends Component {
    state = {
        saveDisabled: false
    }

    render() {
        return (
            <section className="exercise">
                <div key={this.props.exercise.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            {this.props.exercise.name}
                        </h4>
                        <h6 className="card-title">{this.props.exercise.breed}</h6>
                        <button
                            onClick={
                                () => {
                                    this.setState(
                                        { saveDisabled: true },
                                        () => this.props.deleteExercise(this.props.exercise.id)
                                    )

                                }
                            }
                            disabled={ this.state.saveDisabled }
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}