import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import DrNav from '../drnav/drnav';
import './drpres.css';
import { DrPrescriptionRepository } from '../../api/drprescriptionRepository';
import { Redirect} from 'react-router-dom';

export class DrPrescriptionForm extends React.Component {

    drpresRep = new DrPrescriptionRepository();

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            patientname: '',
            doctor: '',
            doctorID: '',
            medname: '',
            date: '',
            dosage: '',
            quantity: '',
            details: '',
            directions: '',
            redirect: '',
            doctors: []
        }
    }

    createPrescription() {
        var pres = {
            patientID: localStorage.getItem('id'),
            docID: this.state.doctorID,
            details: this.state.details,
            medname: this.state.medname,
            date: this.state.date,
            dosage: this.state.dosage,
            quantity: this.state.quantity,
            directions: this.state.directions,
            doctorID: this.state.doctorID
        }
        console.log(pres);
        this.drpresRep.createPrescription(pres)
        .then(resp => {
            this.setState(pState => {
                pState.patient = '';
                pState.doctor = '';
                pState.doctorID = '';
                pState.date = '';
                pState.details = '';
                pState.dosage = '';
                pState.quantity = '';
                pState.directions = '';
                pState.medname = '';
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
                <Card.Body id='request-pres-form'>
                <form>
                    <label htmlFor='patient-name'>Patient Name</label> <br/>
                    <input id='patient-name' type='text'></input> <br/>

                    <label htmlFor='date' >Select a Date</label> <br/>
                    <input id='date' type='date' value={this.state.date} onChange={ e => this.setState({ date: e.target.value})}></input> <br/>
                    
            
                    <label htmlFor="details"> Details: </label>
                        <textarea 
                            className="form-control" 
                            name="details" 
                            rows="1"
                            value={this.state.details}
                            onChange={ e =>  this.setState({ details: e.target.value })}
                            placeholder="Anything about the prescription can go here!"
                        ></textarea><br/>

                    <button type='button' id='request-submit' className='btn btn-primary' onClick={() => this.createPrescription()}>Request</button>
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

    }
}

export default DrPrescriptionForm;