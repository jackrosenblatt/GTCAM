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
            doctor: '',
            doctorID: '',
            medname: '',
            dosage: '',
            quantity: '',
            details: '',
            directions: '',
            redirect: '',
            refillEveryXDays:'',
            doctors: []
        }
    }

    createPrescription() {
        var pres = {
            patientID: localStorage.getItem('id'),
            patientname: this.state.patientname,
            docID: this.state.doctorID,
            details: this.state.details,
            medname: this.state.medname,
            dosage: this.state.dosage,
            quantity: this.state.quantity,
            directions: this.state.directions,
            refillEveryXDays: this.state.refillEveryXDays,
            doctorID: this.state.doctorID
        }
        console.log(pres);
        this.drpresRep.createPrescription(pres)
        .then(resp => {
            this.setState(pState => {
                pState.patientname = '';
                pState.doctor = '';
                pState.doctorID = '';
                pState.date = '';
                pState.details = '';
                pState.dosage = '';
                pState.quantity = '';
                pState.directions = '';
                pState.medname = '';
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
                        <input id='patientname' type='patientname' value={this.state.patientname} onChange={ e => this.setState({ patientname: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>Prescription's Name:</label> <br/>
                        <input id='patientname' type='patientname' value={this.state.medname} onChange={ e => this.setState({ medname: e.target.value})}></input> <br/>
                    </div> 

                    <div class="form-group col-md-4">
                        <label htmlFor='doctor-name'>Select a Doctor</label> <br/>
                        <select id='doctor-name' value={this.state.doctorID} onChange={ e => this.setState({ doctorID: e.target.value})}>
                        <option value='' disabled>Doctor</option>
                            {
                                this.state.doctors.map((doctor) => 
                                <option key={ doctor.ID } value={ doctor.ID }>{ doctor.name }</option>)
                            }
                        </select> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>Dosage</label> <br/>
                        <input id='dosage' type='dosage' value={this.state.dosage} onChange={ e => this.setState({ dosage: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>Quantity:</label> <br/>
                        <input id='quantity' type='quantity' value={this.state.quantity} onChange={ e => this.setState({ quantity: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-4">
                        <label htmlFor='patient-name'>Refill:</label> <br/>
                        <input id='refillEveryXDays' type='refillEveryXDays' value={this.state.refillEveryXDays} onChange={ e => this.setState({ refillEveryXDays: e.target.value})}></input> <br/>
                    </div> 

                    <div className="form-group col-md-12">
                        <label htmlFor='patient-name'>Directions:</label> <br/>
                        <textarea 
                            className="form-control" 
                            name="directions" 
                            rows="1"
                            value={this.state.directions}
                            onChange={ e =>  this.setState({ directions: e.target.value })}
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
                            onChange={ e =>  this.setState({ details: e.target.value })}
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
        var presid = +this.props.match.params.id;
        if(presid) {
            this.drapptRepo.getPrescriptionsForDoctor(presid)
                .then(pres => this.setState({pres}))
        }

        this.doctorRepo.getDoctors()
            .then(doctors => this.setState({ doctors: doctors }));
    }
}

export default DrPrescriptionForm;