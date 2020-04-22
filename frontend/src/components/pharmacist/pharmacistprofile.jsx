import React from 'react';
import { Container, Row, Form } from 'react-bootstrap/lib/Tab';

export class PharmacistProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            pharmID: '',
            pharmLocation: '',
            name: '',
            email: '',
            password: ''
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
                <label for='pharmacist-name'>Your Name</label><br/>
                <input type='text' id='user-name'></input>
                <label for='user-email'>Email</label>
                <input type='text' id='user-email'></input>
                <label for='user-pharmacy'>Pharmacy</label>
                <input type='text' id='user-pharmacy'></input>

            </Form>

        </Container>

        </>;
    }
}