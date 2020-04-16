import React from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';

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
        <Container>
        <Row className='justify-content-md-center' id='register-title'></Row>
            <Jumbotron fluid style={{width:'100%'}} id="register-page-jumbotron">
            <Container className='justify-content-md-center'>
                <Row className='justify-content-md-center' id='register-title'>
                    <h3>Register</h3>
                </Row>
                <Row className='justify-content-md-center'>
                    <form id='register-form'>
                        <div>
                            <label HTMLFor='email-login'>Enter Your Full Name </label> <br/>
                            <input type="text" id='email-login' value={this.state.name} onChange={ e => this.setState({ email: e.target.value })}></input>
                        </div>
                        <br/>
                        <div>
                            <label HTMLFor='email-login'>Enter Your Email </label> <br/>
                            <input type="text" id='email-login' value={this.state.email} onChange={ e => this.setState({ email: e.target.value })}></input>
                        </div>
                        <br/>
                        <div>
                            <label HTMLFor="password-login">Create a Password</label> <br/>
                            <input type='password' id='password-login' value={ this.state.password } onChange={e => this.setState({ password: e.target.value})}></input>
                        </div>
                        <div>

                            <input type='radio' id='user-type' value={this.state.type} onChange={e => this.setState({type: e.target.value})}></input>
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
            <h3>Register for an account here!</h3>
        </>;
    }
}

export default Register;