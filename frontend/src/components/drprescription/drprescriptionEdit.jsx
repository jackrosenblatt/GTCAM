import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import DrNav from '../drnav/drnav';
import './drpres.css';
import { DrPrescriptionRepository } from '../../api/drprescriptionRepository';
import { DoctorRepository } from '../../api/doctorRepository';
import { Redirect} from 'react-router-dom';

export class DrPrescriptionEdit extends React.Component {

    drpresRep = new DrPrescriptionRepository();

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            dosage: '',
            quantity: '',
            details: '',
            directions: '',
            refillEvery:'',
            redirect: ''
        }
    }

    createPrescription() {
        var pres = {
            presID: localStorage.getItem('id'),
            details: this.state.details,
            dosage: this.state.dosage,
            quantity: this.state.quantity,
            directions: this.state.directions,
            refillEvery: this.state.refillEvery,
        }
        console.log(pres);
        this.drpresRep.createPrescription(pres)
        .then(resp => {
            this.setState(pState => {
                pState.presID = '';
                pState.details = '';
                pState.dosage = '';
                pState.quantity = '';
                pState.directions = '';
                pState.refillEvery = '';
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
                <form>
                <div className="form-row"> 

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
                        <input id='refillEveryXDays' type='refillEveryXDays' value={this.state.refillEvery} onChange={ e => this.setState({ refillEvery: e.target.value})}></input> <br/>
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
    }
}
export default DrPrescriptionEdit;