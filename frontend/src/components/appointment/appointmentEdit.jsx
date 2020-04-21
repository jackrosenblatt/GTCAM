import React from 'react';
import { Container, Row, Card} from 'react-bootstrap';
import Nav from '../nav/nav';

export function AppointmentEdit(props) {
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
                    <a href="/appointment" id='editappt-return' className='btn btn-primary'>Cancel Appointment</a> 
                </Card.Title>
                <form>
                    <label htmlFor='patient-name'>Edit Name</label> <br/>
                    <input type='text' id='patient-name' placeholder={ props.patientName }></input> <br/>
                    <label htmlFor='doctor-name'>Change Doctor</label> <br/>
                    <select id='doctor-name'>
                        <option></option>
                    </select> <br/>
                    <label htmlFor=''>Select a New Date</label> <br/>
                    <input type='date' placeholder={ props.date }></input> <br/>
                    <label htmlFor=''>Select a New Time</label> <br/>
                    <input type='time' placeholder= { props.time }></input> <br/>
                    <br/>
                    <a href="/appointment/edit" id='edit-submit' className='btn btn-primary'>Confirm</a>
                </form>
                </Card.Body>
            </Card>

        </Container>
        </>;
}

export default AppointmentEdit;