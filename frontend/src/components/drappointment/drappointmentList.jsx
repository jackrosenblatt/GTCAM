import React from 'react';
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import Nav from '../nav/nav';
import { Appointment } from '../../models/appointment';

export class AppointmentList extends React.Component {
  state = {
      appointments: [
          new Appointment('patient.name', 'doctor.name', 'time', 'details'),
      ],
      apiResponse: ''
  }

  callAPI() {
    fetch("http://localhost:8000/")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  onEmpty(){
    return <>
    <Card>
        <Card.Header>
            You have no appointments!
        </Card.Header>
    </Card>
    </>;
  }

  render() {
    return <>
    <Nav></Nav>
     <h3 id='appointment-header'>Your Appointments</h3>
        {
            this.state.appointments.length === 0 ? this.onEmpty() : ""
        }
        {
            this.state.appointments.map((appointment) => (
                <Card fluid style={{width: '90%'}}>
                    <Card.Header>
                        Appointment with :  appointment.patientName 
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                             appointment.time 
                        </Card.Title>
                        <Card.Text>
                             appointment.details 
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            ))
        }
        <br/>
        <a href="/DrHome" id='return' className="btn btn-primary"> Back to Dashboard</a>
    </>;
  }

  componentWillMount() {
    this.callAPI();
   }
}

export default AppointmentList;

