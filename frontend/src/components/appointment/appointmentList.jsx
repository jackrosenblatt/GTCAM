import React from 'react';
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import Nav from '../nav/nav';
import './appointment.css';
import '../prescription/prescription.css';
import { Appointment } from '../../models/appointment';

export class AppointmentList extends React.Component {
  state = {
      appointments: [
          new Appointment('patient.name', 'doctor.name', 'time', 'details'),
      ]
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
                        Appointment with :  appointment.doctorName 
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
        <a href="/DashBoard" id='return' className="btn btn-primary"> Back to Dashboard</a>
    </>;
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default AppointmentList;

