import React from 'react';
import { Card } from 'react-bootstrap';
import Nav from '../nav/nav';

export class PrescriptionList extends React.Component {
    state = {
        prescriptions: []
    }
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
        <h3>Prescriptions</h3>
        {
            this.state.prescriptions.length === 0 ? this.onEmpty() : ""
        }
        {
            this.state.prescriptions.map((prescription) => (
                <Card>
                    <Card.Header>
                         prescription.medname  :  prescription.dosage 
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                             prescription.quantity 
                        </Card.Title>
                        <Card.Text>
                             prescription.details 
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            ))
        }
        </>;
    }

}

export default PrescriptionList;