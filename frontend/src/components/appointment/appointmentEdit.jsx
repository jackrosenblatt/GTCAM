import React from 'react';
import { Container, Row, Card} from 'react-bootstrap';
import Nav from '../nav/nav';
import { AppointmentRepository } from '../../api/appointmentRepository';

export class AppointmentEdit extends React.Component {

    apptRepo = new AppointmentRepository();

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            patientName: '',
            doctorName: '',
            date: '',
            time:'',
            details: '',
            redirect: ''
        }
    }

    onAppointmentDeleted() {
        this.apptRepo.cancelAppointment(this.state.id)
            .then(resp => {
                this.setState({ redirect: '/appointment'})
            });
    }

    render() {
    return <>
        <Nav></Nav>
        <Container>
            <Row className='justify-content-md-center'>
                <h3 id='request-header'>Edit An Appointment</h3>
            </Row>
            <Card fluid style={{width: '90%'}}>
                <Card.Body id='request-appt-form'>
                <Card.Title style={{float: 'right'}}>
                    {/* add an alert: are you sure you want to cancel? */}
                    <button type='button' id='editappt-return' className='btn btn-primary' onClick={ () => this.onAppointmentDeleted() }>Cancel Appointment</button> 
                </Card.Title>
                <form>
                    <label htmlFor='patient-name'>Edit Name</label> <br/>
                    <input type='text' id='patient-name' placeholder={ this.state.patientName }></input> <br/>
                    <label htmlFor='doctor-name'>Change Doctor</label> <br/>
                    <select id='doctor-name'>
                        <option></option>
                    </select> <br/>
                    <label htmlFor=''>Select a New Date</label> <br/>
                    <input type='date' placeholder={ this.state.date }></input> <br/>
                    <label htmlFor=''>Select a New Time</label> <br/>
                    <input type='time' placeholder= { this.state.time }></input> <br/>
                    <br/>
                    <a href="/appointment/edit" id='edit-submit' className='btn btn-primary'>Confirm</a>
                </form>
                </Card.Body>
            </Card>

        </Container>
        </>
    }

    componentDidMount() {
        // let apptid = +this.props.match.params.id;
        // if(apptid) {
        //     this.apptRepo.g
        //         .then(product => this.setState(product));
        // }
    }
}

export default AppointmentEdit;