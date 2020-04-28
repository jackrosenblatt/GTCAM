import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import DrNav from '../drnav/drnav';
import './drpres.css';
import { PharmacyRepository } from '../../api/pharmacyRepository';
import { Redirect} from 'react-router-dom';

export class DrPrescriptionEdit extends React.Component {

    pharmRepo = new PharmacyRepository();

    constructor(props) {
        super(props);
        this.state = {
            id: +this.props.match.params.medit,
            medName: '',
            dosage: '',
            quantity: '',
            details: '',
            redirect: ''
        }
    }

    editMed() {
        var med = {
            medName: localStorage.getItem('id'),
            dosage: this.state.dosage,
            details: this.state.details,
            quantity: this.state.quantity
        }
        this.pharmRepo.updatePrescriptionById(localStorage.getItem('id',med))
            .then(resp => {
                this.setState(pState => {
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
                <h3 id='request-header'>Edit A Prescription</h3>
            </Row>
            <Card fluid style={{width: '90%'}}>
                <Card.Body id='request-appt-form'>
                <form>
                    <label htmlFor='medName'>Medication Name</label> <br/>
                    <input type='text' id='medName' 
                    value={ this.state.medName } 
                    onChange={e => this.setState({ medName: e.target.value })}
                    placeholder={ this.state.medName }></input> <br/>
                    
                    <label htmlFor='dosage'>Enter Appropriate Dosage</label> <br/>
                    <input type='text' id='dosage' 
                    value={ this.state.dosage } 
                    onChange={e => this.setState({ dosage: e.target.value })}
                    placeholder={ this.state.dosage }></input> <br/>
                    
                    <label htmlFor='quantity'>Enter Quantity</label> <br/>
                    <input type='number' id='quantity' 
                    value={ this.state.quantity } 
                    onChange={e => this.setState({ quantity: e.target.value })}
                    placeholder={ this.state.quantity }></input> <br/>
                    
                    <label htmlFor='details'>Details</label> <br/>
                    <input type='text' id='details' 
                    value={ this.state.details } 
                    onChange={e => this.setState({ details: e.target.value })}
                    placeholder={ this.state.details }></input> <br/>
                    
                    <button type='button' id='edit-submit' className='btn btn-primary' onClick={ () => this.editMed() }>Confirm</button>
                </form>
                </Card.Body>
            </Card>
        </Container>
        </>
    }
    
    componentDidMount() {
        let medit = +this.props.match.params.medit;
         if(medit) {
             this.pharmRepo.getMedicationsInPharmacy(medit)
                 .then(med => this.setState({med}));
        }
    }
}
export default DrPrescriptionEdit;