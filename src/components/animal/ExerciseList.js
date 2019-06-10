import React, { Component } from 'react'
import "./ExerciseList.css"
import ExerciseCard from './ExerciseCard';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class ExerciseList extends Component {

    componentDidMount() {
        console.log("componentDidMount -- ExerciseList")
    }

    render() {
        console.log("render -- ExerciseList")
        return (
            <React.Fragment>
            <ToastContainer className="toastContainer" />
            <div className="centerChildren">
                <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/exercise/new")}
                        }>
                    Add Exercise
                </button>
            </div>
            <article className="animals">
                {
                    this.props.animals.map(animal =>
                        <ExerciseCard key={`animal-${animal.id}`}
                            animal={animal}
                            dischargeAnimal={this.props.dischargeAnimal}
                            owners={this.props.owners}
                            animalOwners={this.props.animalOwners}
                            history={this.props.history}
                            />
                    )
                }
            </article>
            <div className="centerChildren">
                <button onClick={ () => this.props.loadAnimals() }>
                    Reload Exercises
                </button>
            </div>
            </React.Fragment>
        )
    }
}

export default ExerciseList