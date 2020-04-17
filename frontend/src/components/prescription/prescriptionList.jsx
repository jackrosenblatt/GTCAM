import React from 'react';
import { Card } from 'react-bootstrap';
import Nav from '../nav/nav';
import { Prescription } from '../../models/prescription';
import './prescription.css';

export class PrescriptionList extends React.Component {
    state = {
        prescriptions: [ new Prescription('patientname', 'medname', 'date', 'dosage', 'quantity', 'details')]
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
                <Card fluid style={{width: '90%'}} id='prescription-card'>
                    <Card.Header id='prescription-card-header'>
                         prescription.medname:  prescription.dosage 
                    </Card.Header>
                    <Card.Body>
                        <Card.Title id='prescription-title'>
                             prescription.quantity 
                        </Card.Title>
                        <Card.Text id='prescription-text'>
                             prescription.details 
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            ))
        }
        <br/>
        <a href="/DashBoard" id='return' className="btn btn-primary"> Back to Dashboard</a>
        </>;
    }

}

export default PrescriptionList;