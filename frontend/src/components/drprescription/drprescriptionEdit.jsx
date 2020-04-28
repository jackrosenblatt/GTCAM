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
            id: +this.props.match.params.presid,
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
            patID: '',
            patients: []
        }
    }

    onUpdatePrescription() {
        var pres = {
            presID: localStorage.getItem('id'),
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
            refillEveryXDays: this.state.refillEveryXDays
        }

        this.drpresRep.updatePrescriptionById(localStorage.getItem('id'), pres)
            .then(resp => {
                this.setState(pState => {
                    pState.patientID = '';
                    pState.medName = '';
                    pState.dosage = '';
                    pState.quantity = '';
                    pState.pharmName = '';
                    pState.pharmHours = '';
                    pState.details = '';
                    pState.pharmAddress = '';
                    pState.pharmPhoneNumber = '';
                    pState.directions = '';
                    pState.docID = '';
                    pState.subRetriever = '';
                    pState.readyForPickup = '';
                    pState.pickupPrefTime = '';
                    pState.refillEveryXDays = '';
                    pState.redirect = '/DrAppointmentList';
                    return pState;
                });
            })
            .catch(resp => {
                console.log(resp);
                alert(resp);
            });
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
                <Card fluid style={{width: '90%'}}>
                    <Card.Body id='request-appt-form'>
                    <form id="presinfo">
                    <div className="form-row">

                        <div className="form-group col-md-6">
                            <label htmlFor='dosage'>Prescription Name</label> <br/>
                            <input type='text' id='dosage' value={this.state.medName} onChange={ e => this.setState({ medName: e.target.value })} placeholder={ this.state.medName }></input> <br/> 
                        </div> 

                        <div className="form-group col-md-6">
                        <label htmlFor='patient-name'>Patient Name:</label> <br/>
                        <select id='patient-name' value={ this.state.patID } onChange={e => this.setState({ patID: e.target.value })}>
                        {
                            this.state.patients.map((patient) => 
                            <option key={ patient.ID } value={ patient.ID }>{ patient.name }</option>)
                        }
                        </select>
                        </div> 

                        <div className="form-group col-md-4">
                            <label htmlFor='dosage'>Dosage</label> <br/>
                            <input type='text' id='dosage' value={this.state.dosage} onChange={ e => this.setState({ dosage: e.target.value })} placeholder={ this.state.dosage }></input> <br/> 
                        </div> 

                        <div className="form-group col-md-4">
                            <label htmlFor='quantity'>Quantity:</label> <br/>
                            <input type='number' id='quantity' value={this.state.quantity} onChange={ e => this.setState({ quantity: e.target.value })} placeholder={ this.state.quantity }></input> <br/> 
                        </div> 

                        <div className="form-group col-md-4">
                            <label htmlFor='refillEveryXDays'>Refill:</label> <br/>
                            <input type='number' id='refillEveryXDays' value={this.state.refillEveryXDays} onChange={ e => this.setState({ refillEveryXDays: e.target.value })} placeholder={ this.state.refillEveryXDays }></input> <br/> 
                        </div> 

                        <div className="form-group col-md-12">
                            <label htmlFor='directions'>Directions:</label> <br/>
                            <input className="form-control" type='text' rows="1"  id='directions' value={this.state.directions} onChange={ e => this.setState({ directions: e.target.value })} placeholder={ this.state.directions }></input>
                        </div> 

                        <div className="form-group col-md-12">
                            <label htmlFor='details'>Details:</label> <br/>
                            <input className="form-control" type='text' rows="1" id='details' value={this.state.details} onChange={ e => this.setState({ details: e.target.value })} placeholder={ this.state.details }></input> <br/> 
                        </div>

                        <button type='button' id='save-btn' className='btn btn-primary' onClick={ () => this.onUpdatePrescription() }> Confirm </button>
                    
                    </div>  
                    </form>
                    </Card.Body>
                </Card>

        </Container>
        </>
    }
    
    componentDidMount() {
        let presid = +this.props.match.params.presid;
         if(presid) {
             this.drpresRep.getPrescriptionsForDoctor(presid)
                 .then(pres => this.setState({pres}));
        }

        let docID = +this.props.match.params.docID;
         if(docID) {
             this.drpresRep.getPatientbyDocId(docID)
                 .then(patients => this.setState({patients}));
        }
    
    }
}
export default DrPrescriptionEdit;