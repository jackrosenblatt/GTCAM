import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import DrNav from '../drnav/drnav';
import './drpres.css';
import { PharmacyRepository } from '../../api/pharmacyRepository';
import { Redirect} from 'react-router-dom';

export class DrPrescriptionForm extends React.Component {

    pharmRepo = new PharmacyRepository();
    constructor(props) {
        super(props);
        this.state = {
            medName: '',
            dosage: '',
            quantity: '',
            details: '',
            redirect: ''
        }
    }

    createMed() {
        var med = {
            medName: this.state.medName,
            dosage: this.state.dosage,
            details: this.state.details,
            quantity: this.state.quantity
        }
        console.log(med);
        this.pharmRepo.addMedicineToInventory(med)
            .then(resp => {
                this.setState(pState => {
                    pState.medName = '';
                    pState.dosage = '';
                    pState.quantity = '';
                    pState.details = '';
                    pState.redirect = '/DrPrescriptionList';
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
        <DrNav></DrNav>
        <Container>
            <Row className='justify-content-md-center'>
                <h3 id='request-header'>Enter New Medication</h3>
            </Row>
            <Card fluid style={{width: '90%'}}>
                <Card.Body id='request-appt-form'>
                <form>
                    <label htmlFor='med-name'>Medication Name</label> <br/>
                    <input id='med-name' type='text' value={ this.state.medName} onChange={ e => this.setState({ medName: e.target.value})}></input> <br/>                   
                    <label htmlFor='dose' >Enter Appropriate Dosage</label> <br/>
                    <input id='dose' type='text' value={this.state.dosage } onChange={ e => this.setState({ dosage: e.target.value})}></input> <br/>
                    <label htmlFor='quantity'>Enter Number of Doses </label> <br/>
                    <input id='quantity' type='number' value={this.state.quantity } onChange={e => this.setState({ quantity: e.target.value})}></input> <br/>
                    <label htmlFor="details"> Details: </label>
                        <textarea 
                            className="form-control" 
                            name="details" 
                            rows="1"
                            value={this.state.details}
                            onChange={ e =>  this.setState({ details: e.target.value })}
                            placeholder="Any instructions or special directions that need to be added can be entered here"
                        ></textarea>
                    <br/>
                    <button type='button' id='request-submit' className='btn btn-primary' onClick={() => this.createMed()}>Create</button>
                </form>
                </Card.Body>
            </Card>

        </Container>
        </>;
    }
    
        componentDidMount() {
            
        }
    }
    
    export default DrPrescriptionForm;