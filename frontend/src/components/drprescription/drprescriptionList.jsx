import React from 'react';
import DrNav from '../drnav/drnav';
import { Card, Container } from 'react-bootstrap';
import { DrPrescriptionRepository } from '../../api/drprescriptionRepository';
import './drpres.css';
import { Redirect } from "react-router-dom";
import { Prescription } from '../../models/prescription';

export class DrPrescriptionList extends React.Component {

    drpresRepo = new DrPrescriptionRepository();

    constructor(props) {
        super(props);
          this.state = {
                prescription: [],
                newprescriptions: [],
                redirect: '',
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
                disabled: true
          }
      }

    editPrescription() {
        this.setState({ disabled: false });
    }

    onUpdatePrescription() {
        var pres = {
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
            docID: this.state.docID,
            subRetriever: this.state.subRetriever,
            readyForPickup: this.state.readyForPickup,
            pickupPrefTime: this.state.pickupPrefTime,
            refillEveryXDays: this.state.refillEveryXDays,
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
                            <b>Prescription Name:</b> {currentpres.medName}<br/> 
                            <b>Patient Name:</b> {currentpres.patient}
                        </Card.Header>
                        <form>
                        <div className="form-row"> 
                        <Card.Body>
                            <Card.Title style={{float: 'right'}}>
                                <button type='button' id='edit-btn' className='btn btn-primary' disabled= { ! this.state.disabled } onClick={ () => this.editPrescription()  }>Edit </button><br/>
                                <button type='button' id='save-btn' className='btn btn-primary' disabled={ this.state.disabled } onClick={ () => this.onUpdatePrescription() }> Save </button>
                            </Card.Title>
                            <Card.Text>
                                <div className="form-group col-md-4">
                                    <label htmlFor='dosage'>Dosage</label> <br/>
                                    <input className="form-control" type='text' disabled={ this.state.disabled } id='dosage' value={this.state.dosage} onChange={ e => this.setState({ dosage: e.target.value })} placeholder={ currentpres.dosage }></input> 
                                </div> 

                                <div className="form-group col-md-4">
                                    <label htmlFor='quantity'>Quantity:</label> <br/>
                                    <input className="form-control" type='number' disabled={ this.state.disabled } id='quantity' value={this.state.quantity} onChange={ e => this.setState({ quantity: e.target.value })} placeholder={ currentpres.quantity }></input> 
                                </div> 

                                <div className="form-group col-md-4">
                                    <label htmlFor='refillEveryXDays'>Refill:</label> <br/>
                                    <input className="form-control" type='number' disabled={ this.state.disabled } id='refillEveryXDays' value={this.state.refillEveryXDays} onChange={ e => this.setState({ refillEveryXDays: e.target.value })} placeholder={ currentpres.refillEveryXDays }></input> 
                                </div> 

                                <div className="form-group col-md-12">
                                    <label htmlFor='directions'>Directions:</label> <br/>
                                    <input className="form-control" type='text' rows="1" disabled={ this.state.disabled } id='directions' value={this.state.directions} onChange={ e => this.setState({ directions: e.target.value })} placeholder={ currentpres.directions }></input>
                                </div> 

                                <div className="form-group col-md-12">
                                    <label htmlFor='details'>Details:</label> <br/>
                                    <input className="form-control" type='text' rows="1" disabled={ this.state.disabled } id='details' value={this.state.details} onChange={ e => this.setState({ details: e.target.value })} placeholder={ currentpres.details }></input>
                                </div> 
                            </Card.Text>
                        </Card.Body>
                        </div> 
                        </form>
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