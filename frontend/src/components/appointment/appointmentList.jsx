import React from 'react';
import { Link } from "react-router-dom";
import { Card, Jumbotron } from 'react-bootstrap';
import Nav from '../nav/nav';

export class AppointmentList extends React.Component {
  state = {
      appointments: []
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
    <h3>Appointments</h3>
        {
            this.state.appointments.length === 0 ? this.onEmpty() : ""
        }
        {
            this.state.appointments.map((appointment) => (
                <Card>
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
    </>;
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default AppointmentList;

