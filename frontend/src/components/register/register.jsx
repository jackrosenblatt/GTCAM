import React from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';
import './register.css';

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            type: ''
        }
    }

    onRegisterSubmit() {
        
    }
    
    render() {
        return <>
        <Container id='register-page-container'>
        <Row className='justify-content-md-center' id='register-title'></Row>
            <Jumbotron fluid style={{width:'100%'}} id="register-page-jumbotron">
            <Container className='justify-content-md-center'>
                <Row className='justify-content-md-center' id='register-title-form'>
                    <h3>Register</h3>
                </Row>
                <Row className='justify-content-md-center'>
                    <form id='register-form'>
                        <div>
                            <label htmlFor='name-register'>Enter Your Full Name </label> <br/>
                            <input type="text" id='name-register' value={this.state.name} onChange={ e => this.setState({ email: e.target.value })}></input>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor='email-register'>Enter Your Email </label> <br/>
                            <input type="text" id='email-register' value={this.state.email} onChange={ e => this.setState({ email: e.target.value })}></input>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor="password-register">Create a Password</label><br/> 
                            <input type='password' id='password-register' value={ this.state.password } onChange={e => this.setState({ password: e.target.value})}></input>
                        </div>
                        <div>
                            <p>What kind of user are you?</p>
                            <input type="radio" id="patient" name="user-type" value="male"></input>
                            <label htmlFor="patient"> Patient</label><br/>
                            <input type="radio" id="doctor" name="user-type" value="female"></input>
                            <label htmlFor="doctor"> Doctor</label><br/>
                            <input type="radio" id="pharmacist" name="user-type" value="pharmacist"></input>
                            <label htmlFor="pharmacist"> Pharmacist</label>
                        </div>
                        <div id='btn-submit-login'>
                            <br/>
                            <button className='btn btn-primary' id='login-btn' type="button" onClick={ () => this.onRegisterSubmit() }>Submit</button>
                        </div>
                    </form>
                </Row>
            </Container>

            </Jumbotron>
        </Container>
        </>;
    }
}

export default Register;