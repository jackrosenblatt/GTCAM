import React from 'react';
import { Card } from 'react-bootstrap';

export class AppointmentList extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

/* DOES NOT WORK- CAUSES ERROR
  onEmpty(){
    <Card>
        <Card.Header>
            You have no appointments!
        </Card.Header>
    </Card>
  }
  */

  render() {
    return <>

    <h3>Appointments</h3>
        {
            this.props.appointments.length === 0 ? this.onEmpty() : ""
        }
        {
            this.props.appointments.map((appointment) => (
                <Card>
                    <Card.Header>
                        Appointment with : { appointment.doctorName }
                    </Card.Header>
                    <Card.Body>
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
    </>;
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default AppointmentList;

