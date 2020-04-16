import React from 'react';
import { Link } from "react-router-dom";
import { Container, Card } from 'react-bootstrap';

export class MedicalInfo extends React.Component {

    render() {
        return <>

            <p></p>

            <Container>

            <div className="card card bg-light mb-3 border-secondary">
                <div className="card-header font-weight-bold text-center bg-secondary text-light border-secondary mb-3">
                    <h4>Welcome to Your Medical Information!</h4>
                </div>
                <div className="card-body">
                    <p className="card-text">
                            <b>Name: </b> patient.name <br/>
                            <b>Address: </b> patient.address <br/>
                            <b>Doctor's Name: </b> patient.doctorname <br/>
                            <b>Medical Information: </b> patient.medicalinfo <br/>
                            <b>Current Allergies: </b> patient.allergies
                            <ul>
                                <li>peanuts</li>
                                <li>dairy</li>
                                <li>gluten</li>
                            </ul> 
                    </p>
                </div>
            </div>

            <p></p>

            
            <div className="card border-secondary mb-3">
            <h5 className="card-header text-dark border-secondary mb-3">Add A New Allergy Below!</h5>
                <form>
                <div className="card-body">
                    <div className="col-12">
                            <label htmlFor="comment"> <b>New Allegy:</b> </label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3">
                            </textarea>
                            <p></p>
                    </div>

                    <div className="col-3">
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={ () => this.onSubmit() }>
                            Submit
                        </button>
                    </div>

                </div>
                </form>
            </div>

            <p></p>
            <a href="/DashBoard" className="btn btn-primary"> Back to DashBoard</a>
            </Container>

        </>;
    }
}

export default MedicalInfo;