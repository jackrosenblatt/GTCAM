import React from 'react';
import { PharmacyRepository } from '../../api/pharmacyRepository';
import { Container } from 'react-bootstrap';
import PharmNav from '../pharmNav/pharmNav';
import './pharmmed.css';
import { Medications } from '../../models/medications';
import { Router } from 'react-router-dom';

export class PharmMedications extends React.Component {

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
            <div className="font-weight-bold text-center mb-3" id='med-h'>
                <h4>Welcome to Your List of Medications!</h4>
            </div>
 
        {
            this.state.medications.map((med) => (
                <div key={ med.ID } className="card mb-3" id='med'>
                    <h5 className="card-header text-dark mb-3">
                        {med.medName}
                    </h5>
                    <div className="card-body">                        
                        <p className="card-text">
                            <b>Dosage: </b> { med.dosage } <br/>
                            <b>Quantity: </b> { med.quantity } <br/>
                            <b>Details: </b> { med.details } <br/>
                        </p>
                    </div>
                </div>
                        
            ))
        }

        <h4><span id="badge-lowmed" className="float-center badge badge-info">Low Medicine Quantity:</span></h4>

            <a href="/Pharm/medications/create" id="new-medication" className="btn btn-primary">Add a Medication</a> <br/>
            <a href="/PharmHome" id='return-pharmhome' className="btn btn-primary"> Back to Dashboard</a>
                <br/><br/>
            </Container>
        </>;
    }

    componentDidMount() {
        this.pharmRepo.getAllMedications()
            .then(meds => this.setState({medications: meds}));
    }
}

export default PharmMedications;