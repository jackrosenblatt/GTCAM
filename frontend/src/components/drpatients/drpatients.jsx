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
    
            <div className = "card-deck">
            {
                this.state.patients.map((patient) => (
                    <Card key={ patient.ID } fluid style={{width: '90%'}}>
                        <Card.Header>
                            <b>Appointment with:</b> {patient.patient}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                            <b>Time:</b> { patient.time } <br/>
                              <b>Details:</b> { patient.details }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
            </div> <p></p>
  
          </Container>
          <br/>
          <a href="/DrHome" id='return' className="btn btn-primary"> Back to Dashboard</a>
      </>;
    }

    componentDidMount() {
        var patientid = +this.props.match.params.id;
        if(patientid) {
            patientid.drpatetientRepo.getPatientById(patientid)
                .then(patients => this.setState({patients}))
        }
    }
}

export default DrPatients;