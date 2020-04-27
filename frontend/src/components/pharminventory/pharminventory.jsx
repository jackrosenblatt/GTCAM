import React from 'react';
import { PharmacyRepository } from '../../api/pharmacyRepository';
import { Container } from 'react-bootstrap';
import PharmNav from '../pharmNav/pharmNav';

export class PharmInventory extends React.Component {
    
    pharmRepo = new PharmacyRepository();
    constructor(props) {
        super(props);
        this.state = {
            medications: []
        }
    }

    render() {
        return <>
        <PharmNav></PharmNav>
        <br/>
        <Container>
            <div className="font-weight-bold text-center mb-3" id='pharm-h'>
                <h4>Welcome to Your Pharmacy Inventory!</h4>
            </div>
            
        {
            this.state.medications.map(medication =>
                <div key={ medication.medName } className="card mb-3" id='pharm'>
                    <h5 className="card-header text-dark mb-3">
                        { medication.medName }
                    </h5>
                    <div className="card-body">
                        <p className="card-text">
                            <b>Dosage: </b> { medication.dosage } <br/>
                            <b>Number of Doses: </b> { medication.pillCount } <br/>
                            <b>Details: </b> { medication.details } <br/>
                            <b>Quantity: </b> { medication.quantity } <br/>
                            <b>Location: </b> { medication.physicalLocation } <br/>
                        </p>
                    </div>
                </div>
                        
                    )
                }
            <a href="/PharmHome" id='return' className="btn btn-primary"> Back to Dashboard</a>
                <br/><br/>
            </Container>


        </>;
    }

    componentDidMount() {
        this.pharmRepo.getMedicationsInPharmacy()
            .then(medications => this.setState({medications}));
    }
}

export default PharmInventory;