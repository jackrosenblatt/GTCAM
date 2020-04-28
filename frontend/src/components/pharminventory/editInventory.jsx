import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import Nav from '../nav/nav';
import { Prescription } from '../../models/prescription';
import './pharminv.css';
import { PharmacyRepository } from '../../api/pharmacyRepository';

import { Redirect } from 'react-router-dom';

export class EditInventory extends React.Component {

    pharmRepo = new PharmacyRepository();

    constructor(props) {
        super(props);
        this.state = {
            id: +this.props.match.params.medID,
            quantity: '',
            redirect: ''
        }
    }

    editAppointment() {
        var pres = {
            medID: localStorage.getItem('id'),
            quantity: this.state.quantity
        }
        this.prescripRepo.editSubRetriever(localStorage.getItem('id'), pres)
        .then(resp => {
            this.setState(pState => {
                pState.quantity = '';
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
                <h3 id='edit-header'>Update The Medication Stock</h3>
            </Row>
            <Card fluid style={{width: '90%'}}>
                <Card.Body id='edit-sub-form'>
                <form>
                    <label htmlFor='quantity'>Update Stock </label>
                    <textarea 
                            className="form-control" 
                            type="number"
                            quantity="quantity" 
                            rows="1"
                            value={this.state.quantity}
                            onChange={ e =>  this.setState({ quantity: e.target.value })}
                            placeholder={ this.state.quantity }
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
         let medID = +this.props.match.params.medID;
         if(medID) {
             this.prescripRepo.getPrescriptionsToPickupForPatient(medID)
                 .then(pres => this.setState({pres}));
                }
    }
}
export default EditInventory;