import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import DrNav from '../drnav/drnav';
import './drapp.css';
import { DrAppointmentRepository } from '../../api/drappRepository';
import { BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect
  } from 'react-router-dom';


import { DoctorRepository } from '../../api/doctorRepository';


export class DrAppointmentForm extends React.Component {

    doctorRepo = new DoctorRepository();
    drapptRepo = new DrAppointmentRepository();

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            patient: '',
            doctor: '',
            doctorID: '',
            date: '',
            time: '',
            details: '',
            redirect: '',
            doctors: []
        }
    }

    createAppt() {
        var appt = {
            patientID: localStorage.getItem('id'),
            docID: this.state.doctorID,
            time: this.state.date +' '+ this.state.time + ':00',
            details: this.state.details,
            doctorID: this.state.doctorID
        }
        console.log(appt);
        this.drapptRepo.createAppointment(appt)
        .then(resp => {
            this.setState(pState => {
                pState.patient = '';
                pState.doctor = '';
                pState.doctorID = '';
                pState.date = '';
                pState.time = '';
                pState.details = '';
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
                <h3 id='request-header'>Request An Appointment</h3>
            </Row>
            <Card fluid style={{width: '90%'}}>
                <Card.Body id='request-appt-form'>
                <form>
                    <label htmlFor='patient-name'>Your Name</label> <br/>
                    <input id='patient-name' type='text'></input> <br/>
                    <label htmlFor='doctor-name'>Select a Doctor</label> <br/>
                    <select id='doctor-name' value={this.state.doctorID} onChange={ e => this.setState({ doctorID: e.target.value})}>
                    <option value='' disabled>Doctor</option>
                        {
                            this.state.doctors.map((doctor) => 
                            <option key={ doctor.ID } value={ doctor.ID }>{ doctor.name }</option>)
                        }
                    </select> <br/>
                    <label htmlFor='' >Select a Date</label> <br/>
                    <input type='date' value={this.state.date} onChange={ e => this.setState({ date: e.target.value})}></input> <br/>
                    <label htmlFor=''>Select a Time </label> <br/>
                    <input type='time' value={this.state.time} onChange={e => this.setState({ time: e.target.value})}></input> <br/>
                    <label htmlFor="details"> Details: </label>
                        <textarea 
                            className="form-control" 
                            name="details" 
                            rows="1"
                            value={this.state.details}
                            onChange={ e =>  this.setState({ details: e.target.value })}
                            placeholder="Any questions, comments, or concerns you'd like your doctor to know beforehand can be submitted here!"
                        ></textarea>
                    <br/>
                    <button type='button' id='request-submit' className='btn btn-primary' onClick={() => this.createAppt()}>Request</button>
                </form>
                </Card.Body>
            </Card>

        </Container>
        </>
    }

    componentDidMount() {
        var apptid = +this.props.match.params.id;
        if(apptid) {
            this.drapptRepo.getAppointmentById(apptid)
                .then(appt => this.setState({appt}))
        }

        this.doctorRepo.getDoctors()
            .then(doctors => this.setState({ doctors: doctors }));
    }
}

export default DrAppointmentForm;