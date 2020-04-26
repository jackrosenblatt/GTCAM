import React from 'react';
import { Link } from "react-router-dom";
import { Card, Container } from 'react-bootstrap';
import DrNav from '../drnav/drnav';
import './drapp.css';
import { DrAppointmentRepository } from '../../api/drappRepository';
import { Appointment } from '../../models/appointment';


export class DrAppointmentList extends React.Component {

  drapptRepo = new DrAppointmentRepository();

  constructor(props) {
      super(props);
        this.state = {
            appointments: [],
            pastappt: [],
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
    <DrNav></DrNav>
    <p></p>

        <Container>
          <div className="card card bg-light mb-3 border-secondary">
            <div className="card-header font-weight-bold text-center bg-secondary text-light border-secondary mb-3">
                <h4>Welcome to Your Appointment View!</h4>
            </div>
            
            <div className="card-body">
                <p className="card-text text-center">
                Here you can check for upcoming appointments, edit an appointment, <br/>
                make an appointment, cancel an appointment, and view past appointments!
                </p>
            </div>
          </div>

          <h4><span className="float-center badge badge-info">Upcoming Appointments!</span></h4>

          {
            this.state.appointments.length === 0 ? this.onEmpty() : ""
          }
  
          <div className = "card-deck">
          {
              this.state.appointments.map((appointment) => (
                  <Card key={ appointment.ID } fluid style={{width: '90%'}}>
                      <Card.Header>
                          <b>Appointment with:</b> {appointment.patient}
                      </Card.Header>
                      <Card.Body>
                          <Card.Title style={{float: 'right'}}>
                          <Link to={'/DrAppointmentList/edit/' + appointment.ID } 
                                  id='edit-appt' className="btn btn-primary mt-auto">
                              Edit
                          </Link> 
                          </Card.Title>
                          <Card.Text>
                          <b>Time:</b> { appointment.time } <br/>
                            <b>Details:</b> { appointment.details }
                          </Card.Text>
                      </Card.Body>
                  </Card>
              ))
          }
          </div> <p></p>

          <h4><span className="float-center badge badge-info">Past Appointments!</span></h4>

            <div className = "card-deck">
            {
                this.state.pastappt.map((pastapt) => (
                    <Card key={ pastapt.ID } fluid style={{width: '90%'}}>
                        <Card.Header>
                            <b>Appointment with:</b> {pastapt.patient}
                        </Card.Header>
                        <Card.Body>
                            <Card.Title style={{float: 'right'}}>
                            </Card.Title>
                            <Card.Text>
                            <b>Time:</b> { pastapt.time } <br/>
                              <b>Details:</b> { pastapt.details }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
            </div>
            <p></p> 


        </Container>
        <br/>
        <a href="/DrAppointmentList/request" id='makeappt' className='btn btn-primary'>Request Appointment</a> <br/>
        <a href="/DrHome" id='return' className="btn btn-primary"> Back to Dashboard</a>
    </>;
  }
  componentWillMount() {
        this.drapptRepo.getAppointmentsDoctor(localStorage.getItem('id'))
            .then(appointments => this.setState({ appointments }));

        this.drapptRepo.getPastAppointmentsDoctor(localStorage.getItem('id'))
            .then(pastappt => this.setState({ pastappt }));
   }
}
export default DrAppointmentList;