import React from 'react';
import './welcome.css';
import { Container, Jumbotron, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class Welcome extends React.Component {

    render() {
        return <>
        <Container id='welcome-page-container'>
            <Jumbotron fluid style={{width:'100%'}} id='welcome-page-jumbotron'>
                <Container className='justify-contents-md-center'>
                    <Row className='justify-content-md-center'> 
                        <div id='gtcam-logo-welcome'>
                        </div> 
                    </Row>
                    <Row className='justify-content-md-center'>
                        <p>Helping You Make Medicine Easier</p>
                    </Row>
                    <Row className='justify-content-md-center'>
                        <Link to="/login" className='btn btn-primary' id='btn-login'>Login</Link>
                    </Row >
                    <br/>
                    <Row className='justify-content-md-center'>
                        <Link to="/register" className='btn btn-primary' id='btn-register'>Register for An Account</Link>
                    </Row>
                </Container>
            </Jumbotron> 
        </Container>       
        </>;
    }
}

export default Welcome;