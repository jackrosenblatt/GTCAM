import React from 'react';
import { Container, Row, Card} from 'react-bootstrap';
import Nav from '../nav/nav';
import { AppointmentRepository } from '../../api/appointmentRepository';
import { DcotorRepository, DoctorRepository } from '../../api/doctorRepository';
import { Redirect } from 'react-router-dom';

export class AppointmentEdit extends React.Component {

    apptRepo = new AppointmentRepository();
    doctorRepo = new DoctorRepository();

    constructor(props) {
        super(props);
        this.state = {
            id: +this.props.match.params.apptid,
            patient: '',
            doctor: '',
            docID: '',
            time:'',
            details: '',
            doctors: [],
            redirect: ''
        }
    }

    onAppointmentDeleted() {
        this.apptRepo.cancelAppointmentById(+this.props.match.params.apptid)
            .then(resp => {
                this.setState({ redirect: '/appointment'})
            });
    }

    editAppointment() {
        var appt = {
            patientID: localStorage.getItem('id'),
            docID: this.state.docID,
            time: this.state.date +' '+ this.state.time + ':00',
            details: this.state.details,
        }
        this.apptRepo.updateAppointmentById(localStorage.getItem('id'), appt)
        .then(resp => {
            this.setState(pState => {
                pState.patient = '';
                pState.doctor = '';
                pState.doctorID = '';
                pState.date = '';
                pState.time = '';
                pState.details = '';
                pState.redirect = '/appointment';
                return pState;
              });
          })
        .catch(resp => {
            console.log(resp);
            alert(resp);
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
                    <select id='doctor-name' value={ this.state.docID } onChange={e => this.setState({ docID: e.target.value })}>
                        {
                            this.state.doctors.map((doctor) => 
                            <option key={ doctor.ID } value={ doctor.ID }>{ doctor.name }</option>)
                        }
                    </select> <br/>
                    <label htmlFor=''>Select a New Date</label> <br/>
                    <input type='date' placeholder={ this.state.date } value={ this.state.date } onChange={ e => this.setState({ date: e.target.value })}></input> <br/>
                    <label htmlFor=''>Select a New Time</label> <br/>
                    <input type='time' placeholder= { this.state.time } value={ this.state.time } onChange={e => this.setState({ time: e.target.value })}></input> <br/>
                    <label htmlFor='details'>Edit Details: </label>
                    <textarea 
                            className="form-control" 
                            name="details" 
                            rows="1"
                            value={this.state.details}
                            onChange={ e =>  this.setState({ details: e.target.value })}
                            placeholder={ this.state.details }
                        ></textarea>
                    <br/>
                    <button type='button' id='edit-submit' className='btn btn-primary' onClick={ () => this.editAppointment() }>Confirm</button>
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

        this.doctorRepo.getDoctors()
            .then(doctors => this.setState({ doctors: doctors }));
    }
}
export default AppointmentEdit;