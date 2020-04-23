import React from 'react';
import './login.css';
import { Container, Row, Jumbotron } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Home } from '../home/home';

export class Login extends React.Component {
    state = {
        email: '',
        password: '',
        redirect: '',
        showError: ''
    };

    async onSubmit(){
        var user = {
            email: this.state.email,
            password: this.state.password
        } 
        await await this.userRepo.userLogin(user)
        .then(() => {
            if (localStorage.getItem('code') === '200') {
                this.setState(pState => {
                    pState.email = '';
                    pState.password = '';
                    pState.redirect = '/home';
                    pState.showError = false;
                    return pState;
                });
        } else 
            {
                this.setState({ showError: true })
            }
        })
        .catch(resp => {
            console.log(resp);
            this.setState({ showError:true });
        }); 
    this.setState(pState => {
        pState.email = '';
        pState.password = '';
        return pState;
        });  
    }

    render() {
        if (this.state.redirect) {
        return <Redirect to={{ pathname: this.state.redirect }} />
        }
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
                            <a href="/dashboard" className='btn btn-primary' id='login-btn'>Login</a> <br/>
                            <br/> <p>Don't have an account?</p>
                            <a href="/register">Register here</a>
                            {/* <button className='btn btn-primary' id='login-btn' type="button" onClick={ () => this.onSubmit() }>Submit</button> */}
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