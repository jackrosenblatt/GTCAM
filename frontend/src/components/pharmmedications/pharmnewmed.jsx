import React from 'react';
import PharmNav from '../pharmNav/pharmNav';
import { PharmacyRepository } from '../../api/pharmacyRepository';

export class PharmNewMed extends React.Component {
    
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

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
        return <>
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
                            placeholder="Any questions, comments, or concerns you'd like your doctor to know beforehand can be submitted here!"
                        ></textarea>
                    <br/>
                    <button type='button' id='request-submit' className='btn btn-primary' onClick={() => this.createAppt()}>Request</button>
                </form>
                </Card.Body>
            </Card>

        </Container>
        </>;
    }

    componentDidMount() {
        
    }
}