import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import Nav from '../nav/nav';
import './appointment.css';
import { DoctorRepository } from '../../api/doctorRepository';
import { AppointmentRepository } from '../../api/appointmentRepository';

export class AppointmentForm extends React.Component {

    doctorRepo = new DoctorRepository();
    apptRepo = new AppointmentRepository();

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
            doctors: []
        }
    }

    editAppt() {

    }

    render() {
        return <>
        <Nav></Nav>
        <Container>
            <Row className='justify-content-md-center'>
                <h3 id='request-header'>Request An Appointment</h3>
            </Row>
            <Card fluid style={{width: '90%'}}>
                <Card.Body id='request-appt-form'>
                <form>
                    <label htmlFor='patient-name'>Your Name</label> <br/>
                    <input id='patient-name' type='text' value={ this.state.name } onChange={ e => this.setState({ name: e.target.value })} placeholder={ this.state.name }></input> <br/>
                    <label htmlFor='doctor-name'>Select a Doctor</label> <br/>
                    <select id='doctor-name'>
                    <option value='' disabled>Doctor</option>
                        {
                            this.state.doctors.map((doctor) => 
                            <option key={ doctor.ID } value={ doctor.ID }>{ doctor.name }</option>)
                        }
                    </select> <br/>
                    <label htmlFor='' >Select a Date</label> <br/>
                    <input type='date'></input> <br/>
                    <label htmlFor=''>Select a Time </label> <br/>
                    <input type='time'></input> <br/>
                    <br/>
                    <a href="/appointment/request" id='request-submit' className='btn btn-primary'>Request</a>
                </form>
                </Card.Body>
            </Card>

        </Container>
        </>
    }

    componentDidMount() {
        var apptid = +this.props.match.params.id;
        if(apptid) {
            this.apptRepo.getAppointmentById(apptid)
                .then(appt => this.setState({appt}))
        }

        this.doctorRepo.getDoctors()
            .then(doctors => this.setState({ doctors: doctors }));
    }
}

export default AppointmentForm;