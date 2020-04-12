import React from 'react';
import { Container, Row, Form } from 'react-bootstrap/lib/Tab';

export class PatientProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            pharmacyPreference: '',
            name: '',
            email: '',
            password: '',
            allergies: []
        }
    }

    render() {
        return <>
        <Container>
            <Row>
                <h3>
                    Profile
                </h3>
            </Row>
            <Form>
                <label for='user-name'>Your Name</label><br/>
                <input type='text' id='user-name'></input>
                <label for='user-email'>Email</label>
                <input type='text' id='user-email'></input>
                <label for='user-allergy'>Allergies</label>
                <input type='text' id='user-allergy'></input>

            </Form>

        </Container>

        </>;
    }
}