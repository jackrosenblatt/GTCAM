import React from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';


class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }

    onSubmit() {

    }

    render() {
        return <>
        <Container className="justify-content-md-center" id="loginForm">
            <Jumbotron fluid style={{width:'100%'}} className="bg-light" id="form-content">
            <Container>
                <Row className="formTitle">
                    <h3>Login</h3>
                </Row>
                <Row className="bg-light">
                    <form id='login-form'>
                        <div>
                            <Row>
                            <label for='email-login'> Email </label>
                            </Row>
                            <input type="text" id='email-login' value={this.state.email} onChange={ e => this.setState({ email: e.target.value })}></input>
                        </div>
                        <div>
                            <Row>
                                <label for="password-login">Password</label>
                            </Row>
                            <input type='password' id='password-login' value={ this.state.password } onChange={e => this.setState({ password: e.target.value})}></input>
                        </div>
                        <div>
                            <button type="submit" onClick={ () => this.onReviewSubmit() }>Submit</button>
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