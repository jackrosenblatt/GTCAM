import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import Nav from '../nav/nav';
import { Prescription } from '../../models/prescription';
import './prescription.css';
import { PrescriptionRepository } from '../../api/prescriptionRepository';
import { Redirect } from 'react-router-dom';

export class EditSub extends React.Component {

    prescripRepo = new PrescriptionRepository();

    constructor(props) {
        super(props);
        this.state = {
            id: +this.props.match.params.presid,
            name: '',
            redirect: ''
        }
    }

    editAppointment() {
        var pres = {
            patientID: localStorage.getItem('id'),
            name: this.state.name
        }
        this.prescripRepo.editSubRetriever(localStorage.getItem('id'), pres)
        .then(resp => {
            this.setState(pState => {
                pState.name = '';
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
                    <label htmlFor='name'>Edit Sub Retriever: </label>
                    <textarea 
                            className="form-control" 
                            name="name" 
                            rows="1"
                            value={this.state.name}
                            onChange={ e =>  this.setState({ name: e.target.value })}
                            placeholder={ this.state.name }
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
         let presid = +this.props.match.params.presid;
         if(presid) {
             this.prescripRepo.getPrescriptionsToPickupForPatient(presid)
                 .then(pres => this.setState({pres}));
                }
    }
}
export default EditSub;