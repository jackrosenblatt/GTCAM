import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import DrNav from '../drnav/drnav';
import './drpatient.css';
import { DrPatientRepository } from '../../api/drpatientsRepository';

export class DrPatients extends React.Component {

    drpatetientRepo = new DrPatientRepository()

    constructor(props) {
        super(props);
          this.state = {
              patient: [],
              prescriptions: [],
              allergies: []
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

      onPresEmpty(){
        return <>
            This patient does not have any allergies!
        </>;
      }

    render() {
      return <>
      <DrNav></DrNav>
      <p></p>
  
          <Container>
            <div className="card card bg-light mb-3">
              <div className="card-header font-weight-bold text-center text-light mb-3" id='patient-head'>
                  <h4 id='pat-header'>Welcome to Your Patient View!</h4>
              </div>
              
              <div className="card-body">
                  <p className="card-text text-center">
                  Here you will find all of your patients and their medical information.
                  </p>
              </div>
            </div>
  
            <h4><span id='badge-patients' className="float-center badge badge-info">Your Patients:</span></h4>
  
            {
                this.state.patient.length === 0 ? this.onEmpty() : ""
            }
            
            {
                this.state.patient.map((pat) => (
                    <Card key={ pat.ID } id='patient-card' className="card mb-3" fluid style={{width: '93%'}}>
                        <Card.Header>
                            <b>Patient Name:</b> {pat.name}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <b>Email:</b> { pat.email } <br/>
                                <b>Prescriptions:</b> 
                                    {
                                        pat.prescriptions === null ? this.onPresEmpty() : ""
                                    }

                                    {
                                         this.state.prescriptions.map((pres) => (
                                            <li key={pres.medID}> 
                                                {pres.medName}
                                            </li>
                                    ))}
                                <b>Allergies:</b> 
                                    {
                                        pat.llergies === null ? this.onEmpty() : ""
                                    }

                                    {
                                         this.state.allergies.map((alg) => (
                                            <li key={alg.allergyID}> 
                                                {alg.allergyName}
                                            </li>
                                    ))}
                            </Card.Text>
                        </Card.Body>
                    </Card>
            ))}
  
          </Container>
          <br/>
          <a href="/DrHome" id='return' className="btn btn-primary"> Back to Dashboard</a>
      </>;
    }

    componentDidMount() {
        this.drpatetientRepo.getPatientById(localStorage.getItem('id'))
            .then(patient => this.setState({ patient }));

        this.drpatetientRepo.getPatientAllgergiesById(localStorage.getItem('id'))
            .then(allergies => this.setState({ allergies }));

        this.drpatetientRepo.getPatientPrescriptionsById(localStorage.getItem('id'))
            .then(prescriptions => this.setState({ prescriptions }));
    }
}

export default DrPatients;