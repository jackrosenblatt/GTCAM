import React from 'react';
import './login.css';
import { Container, Row, Jumbotron } from 'react-bootstrap';

export class Login extends React.Component {
    state = {
        email: '',
        password: '',
        apiResponse: ''
    };

    onSubmit(){

    }

    render() {
        return <>
        <Container id='login-page-container'>
            <Row className='justify-content-md-center' id='login-title'></Row>
            <Jumbotron fluid style={{width:'100%'}} id="login-page-jumbotron">
            <Container className='justify-content-md-center'>
                <Row className='justify-content-md-center' id='form-title'>
                    <h3>Login</h3>
                </Row>
                <Row className='justify-content-md-center'>
                    <form id='login-form'>
                        <div>
                            <label HTMLFor='email-login'> Email </label> <br/>
                            <input type="text" id='email-login' value={this.state.email} onChange={ e => this.setState({ email: e.target.value })}></input>
                        </div>
                        <br/>
                        <div>
                            <label HTMLFor="password-login">Password</label> <br/>
                            <input type='password' id='password-login' value={ this.state.password } onChange={e => this.setState({ password: e.target.value})}></input>
                        </div>
                        <div id='btn-submit-login'>
                            <br/>
                            <button className='btn btn-primary' id='login-btn' type="button" onClick={ () => this.onReviewSubmit() }>Submit</button>
                        </div>
                    </form>
                </Row>
            </Container>

            </Jumbotron>
        </Container>
        </>;
    }
}

export default Login;