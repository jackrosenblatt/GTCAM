import React from 'react';
import DrNav from '../drnav/drnav';
import { Card, Container } from 'react-bootstrap';
import { DrPrescriptionRepository } from '../../api/drprescriptionRepository';
import { Prescription } from '../../models/prescription';

export class DrPrescriptionList extends React.Component {

    drpresRepo = new DrPrescriptionRepository();

    constructor(props) {
        super(props);
          this.state = {
                prescription: [],
                newprescriptions: [],
                currentprescriptions: [],
                pastprescriptions: [],
                redirect: ''
          }
      }
  
    onEmpty(){
      return <>
      <Card>
          <Card.Header>
              You have no prescriptions!
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
                  <h4>Welcome to Prescription View!</h4>
              </div>
              
              <div className="card-body">
                  <p className="card-text text-center">
                  Here you can see past prescriptions, current prescriptions, and make a new prescriptions!
                  </p>
              </div>
            </div>
  
            <h4><span className="float-center badge badge-info">New Prescriptions!</span></h4>
  
            {
              this.state.prescription.length === 0 ? this.onEmpty() : ""
            }
    
            <div className = "card-deck">
            {
                this.state.newprescriptions.map((newpres) => (
                    <Card key={ newpres.id } fluid style={{width: '90%'}}>
                        <Card.Header>
                            <b>Prescrtion Name:</b> {newpres.medname}
                            <b>Patient Name:</b> {newpres.patientname}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <b>Date:</b> { newpres.date } <br/>
                                <b>Dosage:</b> { newpres.dosage } <br/>
                                <b>Quantity:</b> { newpres.quantity } <br/>
                                <b>Details:</b> { newpres.details } <br/>
                                <b>Directions:</b> { newpres.directions } <br/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
            </div> <p></p>
  
            <h4><span className="float-center badge badge-info">Current Prescriptions!</span></h4>
  
            <div className = "card-deck">
            {
                this.state.currentprescriptions.map((currentpres) => (
                    <Card key={ currentpres.id } fluid style={{width: '90%'}}>
                        <Card.Header>
                            <b>Prescrtion Name:</b> {currentpres.medname}
                            <b>Patient Name:</b> {currentpres.patientname}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <b>Date:</b> { currentpres.date } <br/>
                                <b>Dosage:</b> { currentpres.dosage } <br/>
                                <b>Quantity:</b> { currentpres.quantity } <br/>
                                <b>Details:</b> { currentpres.details } <br/>
                                <b>Directions:</b> { currentpres.directions } <br/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
            </div> <p></p>

            <h4><span className="float-center badge badge-info">Past Prescriptions!</span></h4>
  
            <div className = "card-deck">
            {
                this.state.pastprescriptions.map((pastpres) => (
                    <Card key={ pastpres.id } fluid style={{width: '90%'}}>
                        <Card.Header>
                            <b>Prescrtion Name:</b> {pastpres.medname}
                            <b>Patient Name:</b> {pastpres.patientname}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <b>Date:</b> { pastpres.date } <br/>
                                <b>Dosage:</b> { pastpres.dosage } <br/>
                                <b>Quantity:</b> { pastpres.quantity } <br/>
                                <b>Details:</b> { pastpres.details } <br/>
                                <b>Directions:</b> { pastpres.directions } <br/>
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

    componentWillMount() {
         
     }

}

export default DrPrescriptionList;