import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import DrNav from '../drnav/drnav';
import { DrPatientRepository } from '../../api/drpatientsRepository';

export class DrPatients extends React.Component {

    drpatetientRepo = new DrPatientRepository()

    constructor(props) {
        super(props);
          this.state = {
              patients: [],
              allergies: [],
              prescriptions: []
          }
      }
  
    onEmpty(){
      return <>
      <Card>
          <Card.Header>
              You have no patients!
          </Card.Header>
      </Card>
      </>;
    }

    onAllergiesEmpty(){
        return <>
            This patient does not have any allergies!
        </>;
      }

    render() {
      return <>
      <DrNav></DrNav>
      <p></p>
  
          <Container>
            <div className="card card bg-light mb-3 border-secondary">
              <div className="card-header font-weight-bold text-center bg-secondary text-light border-secondary mb-3">
                  <h4>Welcome to Your Patient View!</h4>
              </div>
              
              <div className="card-body">
                  <p className="card-text text-center">
                  Here you will find all of your patients and their medical information.
                  </p>
              </div>
            </div>
  
            <h4><span className="float-center badge badge-info">Patient Information!</span></h4>
  
            {
                this.state.patients.length === 0 ? this.onEmpty() : ""
            }
            
            {
                this.state.patients.map((patient) => (
                    <Card key={ patient.ID } className="card mb-3" fluid style={{width: '90%'}}>
                        <Card.Header>
                            <b>Patient Name:</b> {patient.name}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <b>Email:</b> { patient.email } <br/>
                                <b>Prescriptions:</b> 
                                    <li>
                                        { patient.medName}
                                    </li> 
                                <b>Allegries:</b> 
                                    <li>
                                        {
                                            patient.allergyName === null ? this.onAllergiesEmpty() : ""
                                        }
                                        { patient.allergyName}
                                    </li> 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
  
          </Container>
          <br/>
          <a href="/DrHome" id='return' className="btn btn-primary"> Back to Dashboard</a>
      </>;
    }

    componentDidMount() {
        this.drpatetientRepo.getPatientById(localStorage.getItem('id'))
            .then(patients => this.setState({ patients }));

        this.drpatetientRepo.getPatientAllgergiesById(localStorage.getItem('id'))
        .then(allergies => this.setState({ allergies }));

        this.drpatetientRepo.getPatientPrescriptionsById(localStorage.getItem('id'))
        .then(prescriptions => this.setState({ prescriptions }));
    }
}

export default DrPatients;