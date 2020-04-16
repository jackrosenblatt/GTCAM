import React from 'react';
import { Container } from 'react-bootstrap';
import AllergyForm from './allergyform';

export class MedicalInfo extends React.Component {
    state = {
        allergies: []
    };

    addAllergy = todo => {
        this.setState(state => ({
          allergies: [...state.allergies, todo]
        }));
      };

    render() {
        return<>

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
                            {this.state.allergies.map(allergies => (
                                <li><div>{allergies.newAllergy}</div></li>
                            ))}
                        </ul> 
                    </p>
                </div>
            </div>

            <AllergyForm onSubmit={this.addAllergy} />

            </Container>
        </>;
    }
}

export default MedicalInfo;