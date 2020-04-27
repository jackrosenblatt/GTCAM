import React from 'react';
import DrNav from '../drnav/drnav';
import { Card, Container } from 'react-bootstrap';
import { DrPrescriptionRepository } from '../../api/drprescriptionRepository';
import './drpres.css';
import { Link, Redirect } from "react-router-dom";
import { Prescription } from '../../models/prescription';

export class DrPrescriptionList extends React.Component {

    drpresRepo = new DrPrescriptionRepository();

    constructor(props) {
        super(props);
          this.state = {
                prescription: [],
                newprescriptions: [],
                id: '',
                patient: '',
                patientID: '',
                medName: '',
                dosage: '',
                quantity: '',
                details: '',
                pharmName: '',
                pharmHours: '',
                pharmAddress: '',
                pharmPhoneNumber: '',
                directions: '',
                doctor: '',
                docID: '',
                needRefill: '',
                subRetriever: '',
                readyForPickup: '',
                pickupPrefTime: '',
                refillEveryXDays: '',
                redirect: '',
                disabled: true
          }
      }

    editPrescription() {
        this.setState({ disabled: false });
    }

    onUpdatePrescription() {
        if(this.state.medName !== '') {
            localStorage.setItem('medName', this.state.medName);
        }
        
        var pres = {
            patient: this.state.patient,
            patientID: this.state.patientID,
            medName: this.state.medName,
            dosage: this.state.dosage,
            quantity: this.state.quantity,
            details: this.state.details,
            pharmName: this.state.pharmName,
            pharmHours: this.state.pharmHours,
            pharmAddress: this.state.pharmAddress,
            pharmPhoneNumber: this.state.pharmPhoneNumber,
            directions: this.state.directions,
            doctor: this.state.doctor,
            docID: this.state.docID,
            needRefill: this.state.needRefill,
            subRetriever: this.state.subRetriever,
            readyForPickup: this.state.readyForPickup,
            pickupPrefTime: this.state.pickupPrefTime,
            refillEveryXDays: this.state.refillEveryXDays
        }

        this.drpresRepo.updatePrescriptionById(localStorage.getItem('id'), pres)
            .then(() => {
                this.setState({ disabled: true });
            })
            .catch(() => this.setState({ pres }));
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
                    Add a new prescription!
                </Card.Header>
            </Card>
        </>;
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
        return <>
        <DrNav></DrNav>
        <p></p>
            <Container>

                <div className="card card mb-3">
                    <div className="card-header font-weight-bold text-center text-light mb-3" id='prescrip-head'>
                        <h4 id='prescrip-welcome'>Welcome to Prescription View!</h4>
                    </div>

                    <div className="card-body">
                        <p className="card-text text-center">
                            Here you can see current prescription and make a new prescriptions!
                        </p>
                    </div>
                </div>

                <h4><span id="badge-prescrip" className="float-center badge badge-info">Current Prescriptions:</span></h4>

                {
                    this.state.prescription.length === 0 ? this.onEmpty() : ""
                }
            
                {
                    this.state.prescription.map((currentpres) => (
                        <Card id='prescrip-card' key={ currentpres.patient } className="card mb-3" fluid style={{width: '93%'}}>
                            <Card.Header>
                                <b>Prescription Name:</b> {currentpres.medName}  <br/> 
                                <b>Patient Name:</b> {currentpres.patient}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title style={{float: 'right'}}>
                                <Link to={'/DrPrescriptionList/edit/' + currentpres.ID } id='edit-appt' className="btn btn-primary  mt-auto">
                                    Edit
                                </Link> 
                                </Card.Title>
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
            
            <h4><span id="prescrip-badge" className="float-center badge badge-info">New Prescriptions:</span></h4>
  
            {
              this.state.newprescriptions.length === 0 ? this.onNewEmpty() : ""
            }
    
            {
                this.state.newprescriptions.map((newpres) => (
                    <Card key={ newpres.id } className="card mb-3" fluid style={{width: '90%'}}>
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