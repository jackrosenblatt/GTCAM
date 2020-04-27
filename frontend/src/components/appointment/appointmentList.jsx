import React from 'react';
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import Nav from '../nav/nav';
import './appointment.css';
import { Appointment } from '../../models/appointment';
import { AppointmentRepository } from '../../api/appointmentRepository';

export class AppointmentList extends React.Component {

    apptRepo = new AppointmentRepository();

  constructor(props) {
      super(props);
        this.state = {
            appointments: [],
            redirect: ''
        }
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
        <div>
        {
            this.state.appointments.map((appointment) => (
                <Card key={ appointment.ID } id='appt-card' fluid style={{width: '90%'}}>
                    <Card.Header>
                        Appointment with: { appointment.doctor }
                    </Card.Header>
                    <Card.Body>
                        <Card.Title style={{float: 'right'}}>
                        <Link to={'/appointment/edit/' + appointment.ID } id='edit-appt' className="btn btn-primary  mt-auto">
                                     Edit
                        </Link> 
                        </Card.Title>
                        <Card.Title>
                            { appointment.time }
                        </Card.Title>
                        <Card.Text>
                            { appointment.details }
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            ))
        }
        <br/>
        <a href="/appointment/request" id='makeappt-btn' className='btn btn-primary'>Request Appointment</a> <br/>
        <a href="/DashBoard" id='return-dAsh' className="btn btn-primary"> Back to Dashboard</a>
        </div>
    </>;
  }
  componentWillMount() {
        this.apptRepo.getAppointmentsPatient(localStorage.getItem('id'))
            .then(appointments => this.setState({ appointments }));
   }
}
export default AppointmentList;

