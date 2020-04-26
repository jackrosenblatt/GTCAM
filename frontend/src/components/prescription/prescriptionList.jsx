import React from 'react';
import { Card } from 'react-bootstrap';
import Nav from '../nav/nav';
import { Prescription } from '../../models/prescription';
import './prescription.css';
import { PrescriptionRepository } from '../../api/prescriptionRepository';

export class PrescriptionList extends React.Component {
    
    prescripRepo = new PrescriptionRepository();
    constructor(props) {
        super(props);
        this.state = {
            prescriptions: []
        }
    }

    getMedInfo() {
        
    }

    //routing here to get prescriptions from backend
    onEmpty() {
        return <>
        <Card>
            <Card.Header>
                You have no prescriptions!
            </Card.Header>
        </Card>
        </>;
    }

    render() {
        return <>
        <Nav></Nav>
        <h3 id='prescription-header'>Your Prescriptions</h3>
        {
            this.state.prescriptions.length === 0 ? this.onEmpty() : ""
        }
        {
            this.state.prescriptions.map((prescription) => (
                <Card key={prescription.id} fluid style={{width: '90%'}} id='prescription-card'>
                    <Card.Header id='prescription-card-header'>
                            {prescription.medName}:  {prescription.dosage }
                    </Card.Header>
                    <Card.Body>
                        <Card.Title id='prescription-title'>
                            { prescription.directions }, total prescribed: { prescription.quantity } doses
                        </Card.Title>
                        <Card.Text id='prescription-text'>
                            Prescribed by Dr. { prescription.doctor}. { prescription.details }.
                            Refill at { prescription.pharmName } every { prescription.refillEveryXDays } days.
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
                
            ))
        }
        <br/>
        <a href="/DashBoard" id='return' className="btn btn-primary"> Back to Dashboard</a>
        </>;
    }

    componentDidMount() {
        this.prescripRepo.getPrescriptionsForPatient(localStorage.getItem('id'))
            .then(prescrip => this.setState({ prescriptions: prescrip }));

    }

}

export default PrescriptionList;