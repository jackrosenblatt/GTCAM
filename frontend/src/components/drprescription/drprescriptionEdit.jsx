import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import DrNav from '../drnav/drnav';
import './drpres.css';
import { DrPrescriptionRepository } from '../../api/drprescriptionRepository';
import { Redirect} from 'react-router-dom';

export class DrPrescriptionEdit extends React.Component {

    drpresRep = new DrPrescriptionRepository();

    constructor(props) {
        super(props);
        this.state = {
            prescription: [],
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
            redirect: '/DrAppointmentList'
        }

        this.drpresRep.updatePrescriptionById(localStorage.getItem('id'), pres)
            .then(() => {
                this.setState({ disabled: true });
            })
            .catch(() => this.setState({ pres }));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
    return <>
        <DrNav></DrNav>
        <Container>
            <Row className='justify-content-md-center'>
                <h3 id='request-header'>Edit A Prescription</h3>
            </Row>

            { this.state.prescription.map((prescription) => (

                <Card fluid style={{width: '90%'}}>
                    <Card.Body id='request-appt-form'>
                    <form id="presinfo">
                    <div className="form-row"> 

                        <div className="form-group col-md-4">
                            <label htmlFor='dosage'>Dosage</label> <br/>
                            <input type='text' disabled={ this.state.disabled } id='dosage' value={this.state.dosage} onChange={ e => this.setState({ dosage: e.target.value })} placeholder={ prescription.dosage }></input> <br/> 
                        </div> 

                        <div className="form-group col-md-4">
                            <label htmlFor='quantity'>Quantity:</label> <br/>
                            <input type='text' disabled={ this.state.disabled } id='quantity' value={this.state.quantity} onChange={ e => this.setState({ quantity: e.target.value })} placeholder={ prescription.quantity }></input> <br/> 
                        </div> 

                        <div className="form-group col-md-4">
                            <label htmlFor='refillEveryXDays'>Refill:</label> <br/>
                            <input type='text' disabled={ this.state.disabled } id='refillEveryXDays' value={this.state.refillEveryXDays} onChange={ e => this.setState({ refillEveryXDays: e.target.value })} placeholder={ prescription.refillEveryXDays }></input> <br/> 
                        </div> 

                        <div className="form-group col-md-12">
                            <label htmlFor='directions'>Directions:</label> <br/>
                            <input className="form-control" type='text' rows="1" disabled={ this.state.disabled } id='directions' value={this.state.directions} onChange={ e => this.setState({ directions: e.target.value })} placeholder={ prescription.directions }></input>
                        </div> 

                        <div className="form-group col-md-12">
                            <label htmlFor='details'>Details:</label> <br/>
                            <input className="form-control" type='text' rows="1" disabled={ this.state.disabled } id='details' value={this.state.details} onChange={ e => this.setState({ details: e.target.value })} placeholder={ prescription.details }></input> <br/> 
                        </div>

                        <button type='button' id='edit-btn' className='btn btn-primary' disabled= { ! this.state.disabled } onClick={ () => this.editPrescription()  }>Edit </button><br/>
                        <button type='button' id='save-btn' className='btn btn-primary' disabled={ this.state.disabled } onClick={ () => this.onUpdatePrescription() }> Save </button>
                    
                    </div>  
                    </form>
                    </Card.Body>
                </Card>
            ))}         


        </Container>
        </>
    }
    
    componentWillMount() {
        this.drpresRep.getPrescriptionsForDoctor(localStorage.getItem('id'))
            .then(prescription => this.setState({ prescription }));
   
        }
}
export default DrPrescriptionEdit;