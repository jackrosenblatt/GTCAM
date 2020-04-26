import React from 'react';
import { Container, Row, Card} from 'react-bootstrap';
import Nav from '../nav/nav';
import { AppointmentRepository } from '../../api/appointmentRepository';
import { BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect
  } from 'react-router-dom';

export class AppointmentEdit extends React.Component {

    apptRepo = new AppointmentRepository();

    constructor(props) {
        super(props);
        this.state = {
            id: +this.props.match.params.apptid,
            patient: '',
            doctor: '',
            time:'',
            details: '',
            redirect: ''
        }
    }

    onAppointmentDeleted() {
        this.apptRepo.cancelAppointmentById(+this.props.match.params.apptid)
            .then(resp => {
                this.setState({ redirect: '/appointment'})
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
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
                    <input type='text' id='patient-name' placeholder={ this.state.patient }></input> <br/>
                    <label htmlFor='doctor-name'>Change Doctor</label> <br/>
                    <select id='doctor-name'>
                        <option></option>
                    </select> <br/>
                    <label htmlFor=''>Select a New Date</label> <br/>
                    <input type='date' placeholder={ this.state.date }></input> <br/>
                    <label htmlFor=''>Select a New Time</label> <br/>
                    <input type='time' placeholder= { this.state.time }></input> <br/>
                    <label htmlFor='details' placeholder={this.state.details }></label>
                    <br/>
                    <a href="/appointment/edit" id='edit-submit' className='btn btn-primary'>Confirm</a>
                </form>
                </Card.Body>
            </Card>

        </Container>
        </>
    }
    componentDidMount() {
         let apptid = +this.props.match.params.apptid;
         if(apptid) {
             this.apptRepo.getAppointmentById(apptid)
                 .then(appt => this.setState({appt}));
         }
    }
}
export default AppointmentEdit;