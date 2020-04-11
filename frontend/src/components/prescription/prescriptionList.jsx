import React from 'react';
import { Card } from 'react-bootstrap';

export class PrescriptionList extends React.Component {

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
        <h3>Prescriptions</h3>
        {
            this.props.prescriptions.length === 0 ? this.onEmpty() : ""
        }
        {
            this.props.prescriptions.map((prescription) => (
                <Card>
                    <Card.Header>
                        { prescription.medname } : { prescription.dosage }
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            { prescription.quantity }
                        </Card.Title>
                        <Card.Text>
                            { prescription.details }
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            ))
        }
        </>;
    }

}

export default PrescriptionList;