import React from 'react';
import { Link } from "react-router-dom";
import { Container, Card } from 'react-bootstrap';

export class MedicalInfo extends React.Component {

    render() {
        return <>

            <p></p>

            <Container>

            <div className="card text-center">
                <div className="card-header font-weight-bold">
                    <h4>Welcome to Your Medical Information!</h4>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        Name: patient.name <br/>
                        Address:  patient.address <br/>
                        Doctor's Name: patient.doctorname <br/>
                        Medical Information: patient.medicalinfo <br/>
                        Current Allergies: patient.allergies
                    </p>
                </div>
                <div className="card-footer text-muted">
                    <a href="/DashBoard" className="btn btn-primary"> Back to DashBoard</a>
                </div>
            </div>

            <p></p>

            
            <div className="card">
            <h5 className="card-header bg-secondary text-light">Add A New Allergy</h5>
                <form>
                <div className="card-body">

                    <div className="col-12">
                            <label htmlFor="comment">New Allegy:</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3">
                            </textarea>
                            <p></p>
                    </div>

                </div>
                </form>
            </div>
    
            </Container>

        </>;
    }
}

export default MedicalInfo;