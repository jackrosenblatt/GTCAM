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
            id: +this.props.match.params.timeid,
            date: '',
            redirect: ''
        }
    }

    editAppointment() {
        var time = {
            patientID: localStorage.getItem('id'),
            date: this.state.date
        }
        this.prescripRepo.editpickupPrefTime(localStorage.getItem('id'), time)
        .then(resp => {
            this.setState(pState => {
                pState.date = '';
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
                    <label htmlFor='date'>Edit Time Pickup! </label>
                    <textarea 
                            className="form-control" 
                            name="date" 
                            rows="1"
                            value={this.state.date}
                            onChange={ e =>  this.setState({ date: e.target.value })}
                            placeholder={ this.state.date }
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
         let timeid = +this.props.match.params.timeid;
         if(timeid) {
             this.prescripRepo.getPrescriptionsToPickupForPatient(timeid)
                 .then(time => this.setState({time}));
                }
    }
}
export default EditPrefTime;