import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import Nav from '../nav/nav';
import './appointment.css';

export function AppointmentForm(props) {

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
                    <input type='text' id='patient-name'></input> <br/>
                    <label htmlFor='doctor-name'>Select a Doctor</label> <br/>
                    <select id='doctor-name'>
                        <option></option>
                    </select> <br/>
                    <label htmlFor='' >Select a Date</label> <br/>
                    <input type='date'></input> <br/>
                    <label htmlFor=''>Select a Time </label>
                    <input type='time'></input> <br/>
                    <br/>
                    <a href="/appointment/request" id='request-submit' className='btn btn-primary'>Request</a>
                </form>
                </Card.Body>
            </Card>

        </Container>
        </>;
}

export default AppointmentForm;