import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import Nav from '../nav/nav';
import { Prescription } from '../../models/prescription';
import './prescription.css';
import { PrescriptionRepository } from '../../api/prescriptionRepository';
import { Redirect } from 'react-router-dom';

export class EditPrefTime extends React.Component {

    prescripRepo = new PrescriptionRepository();

    constructor(props) {
        super(props);
        this.state = {
            id: +this.props.match.params.presid,
            date: '',
            time: '',
            redirect: ''
        }
    }

    editAppointment() {
        var time = {
            patientID: localStorage.getItem('id'),
            date: this.state.date +' '+ this.state.time + ':00',
        }
        this.prescripRepo.editpickupPrefTime(localStorage.getItem('id'), time)
        .then(resp => {
            this.setState(pState => {
                pState.date = '';
                pState.time = '';
                pState.redirect = '/prescriptions';
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
                <h3 id='edit-header'>Update Your Substitute Retriever</h3>
            </Row>
            <Card fluid style={{width: '90%'}}>
                <Card.Body id='edit-sub-form'>
                <form>
                    <label htmlFor=''>Select a New Time</label> <br/>
                    <input type='date' placeholder= { this.state.date } value={ this.state.date } onChange={e => this.setState({ date: e.target.value })}></input> <br/><br/>
                    <label htmlFor=''>Select a New Time</label> <br/>
                    <input type='time' placeholder= { this.state.time } value={ this.state.time } onChange={e => this.setState({ time: e.target.value })}></input> <br/><br/>
                    <button type='button' id='edit-submit' className='btn btn-primary' onClick={ () => this.editAppointment() }>Confirm</button>
                </form>
                </Card.Body>
            </Card>

        </Container>
        </>
    }
    componentDidMount() {
         let presid = +this.props.match.params.presid;
         if(presid) {
             this.prescripRepo.getPrescriptionsToPickupForPatient(presid)
                 .then(time => this.setState({time}));
            }
    }
}
export default EditPrefTime;