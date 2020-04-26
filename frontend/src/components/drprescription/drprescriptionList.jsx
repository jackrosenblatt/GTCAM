import React from 'react';
import DrNav from '../drnav/drnav';
import { Card, Container } from 'react-bootstrap';
import { DrPrescriptionRepository } from '../../api/drprescriptionRepository';
import './drpres.css';
import { Prescription } from '../../models/prescription';

export class DrPrescriptionList extends React.Component {

    drpresRepo = new DrPrescriptionRepository();

    constructor(props) {
        super(props);
          this.state = {
                prescription: [],
                newprescriptions: [],
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

    onNewEmpty(){
        return <>
        <Card>
            <Card.Header>
                You have no new prescriptions!
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
                  Here you can see current prescription and make a new prescriptions!
                  </p>
              </div>
            </div>


            <h4><span className="float-center badge badge-info">Current Prescriptions!</span></h4>

            {
              this.state.prescription.length === 0 ? this.onEmpty() : ""
            }
  
            <div className = "card-deck">
            {
                this.state.prescription.map((currentpres) => (
                    <Card key={ currentpres.patientname } fluid style={{width: '90%'}}>
                        <Card.Header>
                            <b>Pres. Name:</ b> {currentpres.medName} <br/>
                            <b>Patient Name:</b> {currentpres.patient}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <b>Dosage:</b> { currentpres.dosage } <br/>
                                <b>Quantity:</b> { currentpres.quantity } <br/>
                                <b>Details:</b> { currentpres.details } <br/>
                                <b>Directions:</b> { currentpres.directions } <br/>
                                <b>Refill:</b> { currentpres.refillEveryXDays } <br/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
            </div> <p></p>
  
            <h4><span className="float-center badge badge-info">New Prescriptions!</span></h4>
  
            {
              this.state.newprescriptions.length === 0 ? this.onNewEmpty() : ""
            }
    
            <div className = "card-deck">
            {
                this.state.newprescriptions.map((newpres) => (
                    <Card key={ newpres.id } fluid style={{width: '90%'}}>
                        <Card.Header>
                            <b>Prescrtion Name:</b> {newpres.medname} <br/>
                            <b>Patient Name:</b> {newpres.patientname}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
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

          </Container>
          <br/>
          <a href="/DrPrescriptionList/request" id='makepres' className='btn btn-primary'>Make a New Prescription</a> <br/>
          <a href="/DrHome" id='return' className="btn btn-primary"> Back to Dashboard</a>
      </>;
    }

    componentWillMount() {
        this.drpresRepo.getPrescriptionsForDoctor(localStorage.getItem('id'))
            .then(prescription => this.setState({ prescription }));
   }

}

export default DrPrescriptionList;