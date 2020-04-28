import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import DrNav from '../drnav/drnav';
import './drpres.css';
import { DrPrescriptionRepository } from '../../api/drprescriptionRepository';
import { DoctorRepository } from '../../api/doctorRepository';
import { Redirect} from 'react-router-dom';

export class DrPrescriptionForm extends React.Component {

    drpresRep = new DrPrescriptionRepository();
    doctorRepo = new DoctorRepository();

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            patientname: '',
            medname: '',
            dosage: '',
            quantity: '',
            details: '',
            directions: '',
            doctors: [],

            patient: '',
            patientID: '',
            pharmName: '',
            pharmHours: '',
            pharmAddress: '',
            pharmPhoneNumber: '',
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

    createPrescription() {
        var pres = {
            patientID: localStorage.getItem('id'),
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
            pickupPrefTime: this.state.pickupPrefTime,
            refillEveryXDays: this.state.refillEveryXDays,
        }
        console.log(pres);
        this.drpresRep.createPrescription(pres)
        .then(resp => {
            this.setState(pState => {
                pState.patientname = '';
                pState.medName = '';
                pState.dosage = '';
                pState.quantity = '';
                pState.details = '';
                pState.pharmName = '';
                pState.pharmHours = '';
                pState.pharmAddress = '';
                pState.pharmPhoneNumber = '';
                pState.directions = '';
                pState.docID = '';
                pState.subRetriever = '';
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
                <h3 id='request-header'>Request A New Prescription</h3>
            </Row>

            <Card fluid style={{width: '90%'}}>
                <Card.Body id='request-appt-form'>
                <form>
                <div className="form-row"> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>Patient's Name:</label> <br/>
                        <input id='patient-name' type='text' value={this.state.patient} onChange={ e => this.setState({ patient: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='medname'>Prescription's Name:</label> <br/>
                        <input id='med-name' type='text' value={this.state.medName} onChange={ e => this.setState({ medName: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='medname'>Prescription's Name:</label> <br/>
                        <input id='med-name' type='text' value={this.state.docID} onChange={ e => this.setState({ docID: e.target.value})}></input> <br/>
                    </div> 


                    <div className="form-group col-md-4">
                        <label htmlFor='dosage'>Dosage</label> <br/>
                        <input id='dosage' type='text' value={this.state.dosage} onChange={ e => this.setState({ dosage: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>Quantity:</label> <br/>
                        <input id='quantity' type='number' value={this.state.quantity} onChange={ e => this.setState({ quantity: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>Refill:</label> <br/>
                        <input id='med-name' type='number' value={this.state.refillEveryXDays} onChange={ e => this.setState({ refillEveryXDays: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>Need Refill?</label> <br/>
                        <input id='med-name' type='test' value={this.state.needRefill} onChange={ e => this.setState({ needRefill: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='dosage'>Pharmacy Name</label> <br/>
                        <input id='pharmName' type='text' value={this.state.pharmName} onChange={ e => this.setState({ pharmName: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>Pharmacy Hours:</label> <br/>
                        <input id='qupharmHoursantity' type='text' value={this.state.pharmHours} onChange={ e => this.setState({ pharmHours: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>Pharmacy Address:</label> <br/>
                        <input id='pharmAddress' type='text' value={this.state.pharmAddress} onChange={ e => this.setState({ pharmAddress: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>Sub Retriever</label> <br/>
                        <input id='subRetriever' type='text' value={this.state.subRetriever} onChange={ e => this.setState({ subRetriever: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>readyForPickup</label> <br/>
                        <input id='readyForPickup' type='text' value={this.state.readyForPickup} onChange={ e => this.setState({ readyForPickup: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>pickupPrefTime</label> <br/>
                        <input id='pickupPrefTime' type='text' value={this.state.pickupPrefTime} onChange={ e => this.setState({ pickupPrefTime: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-12">
                        <label htmlFor='patient-name'>Directions:</label> <br/>
                        <textarea 
                            className="form-control" 
                            name="directions" 
                            rows="1"
                            value={this.state.medNdirectionsame} 
                            onChange={ e => this.setState({ directions: e.target.value})}
                            placeholder="Type the directions of the prescription here..."
                        ></textarea>
                    </div> <br/>

                    <div className="form-group col-md-12">
                        <label htmlFor='patient-name'>Details:</label> <br/>
                        <textarea 
                            className="form-control" 
                            name="details" 
                            rows="1"
                            value={this.state.details} 
                            onChange={ e => this.setState({ details: e.target.value})}
                            placeholder="Type the details of the prescription here.."
                        ></textarea>
                    </div><br/>

                    <button type='button' id='request-submit' className='btn btn-primary' onClick={() => this.createPrescription()}>Request</button>
                </div>  
                </form>
                </Card.Body>
            </Card>
        </Container>
        </>
    }

    componentDidMount() {
        this.drpresRep.getPrescriptionsForDoctor(localStorage.getItem('id'))
            .then(prescription => this.setState({ prescription }));

        this.doctorRepo.getDoctors()
            .then(doctors => this.setState({ doctors: doctors }));
    }
}

export default DrPrescriptionForm;