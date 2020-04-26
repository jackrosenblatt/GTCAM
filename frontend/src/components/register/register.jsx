import React from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';
import './register.css';
import { UserRepository } from '../../api/userRepository';
import { PharmacyRepository } from '../../api/pharmacyRepository';
import { BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect
  } from 'react-router-dom';

export class Register extends React.Component {

    userRepo = new UserRepository();
    pharmRepo = new PharmacyRepository();

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            type: '',
            notifPref: '',
            pharmacyPref: '',
            ssn: '',
            pharmID: '',
            isPatient: 'false',
            isPharmacist: 'false',
            pharmacies: []
        }
    }

    async onRegisterSubmit() {
        if( this.state.type === '1'){
            var user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                type: this.state.type,
                notificationPref: this.state.notifPref,
                pharmacyPref: this.state.pharmacyPref,
                ssn: this.state.ssn,
                pharmID: this.state.pharmID,
              }
        }
        else if(this.state.type === '2')
        {
            var user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                type: this.state.type,
              }
        }
        else {
            var user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                type: this.state.type,
                pharmID: this.state.pharmID,
              }
        }
        
  
          await this.userRepo.registerUser(user)
            .then(resp => {
              this.setState(pState => {
                  pState.email = '';
                  pState.password = '';
                  pState.name = '';
                  pState.type = '';
                  pState.notifPref = '';
                  pState.pharmacyPref = '';
                  pState.ssn = '';
                  pState.pharmID = '';
                  pState.isPatient = 'false';
                  pState.isPharmacist = 'false';
                  pState.pharmacies = [];
                  pState.redirect = '/login';
                  return pState;
                });
            })
            .catch(resp => {
                console.log(resp);
                alert(resp);
            });
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
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
                            <input type="text" id='name-register' value={this.state.name} onChange={ e => this.setState({ name: e.target.value })}></input>
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
                            <input type="radio" id="patient" name="user-type" value="1" onChange={ e => { this.setState({ type: e.target.value }); this.setState({ isPatient: 'true'}); }}></input>
                            <label htmlFor="patient"> Patient</label><br/>
                            <input type="radio" id="doctor" name="user-type" value="2" onChange={ e => this.setState({ type: e.target.value }) }></input>
                            <label htmlFor="doctor"> Doctor</label><br/>
                            <input type="radio" id="pharmacist" name="user-type" value="3" onChange={ e => { this.setState({ type: e.target.value }); this.setState({ isPharmacist: 'true' }); }}></input>
                            <label htmlFor="pharmacist"> Pharmacist</label>
                        </div>
                        {
                            this.state.isPatient === 'true' ?
                            <div id='ifPatient'>
                            <label htmlFor='ssn'>Social Security Number</label> <br/>
                            <input type='number' value={ this.state.ssn} onChange={e => this.setState({ ssn: e.target.value})}></input> <br/>
                             <label htmlFor='notifpref'>Notification Preferences</label> <br/>
                            <select id='notifpref' value={ this.state.notifPref } onChange={ e => this.setState({ notifPref: e.target.value })}>
                                <option value='' disabled>Notification</option>
                                <option value='0'>Off</option>
                                <option value='1'>On</option>
                            </select> <br/>
                            <label htmlFor='pharmpref'>Pharmacy Preferences</label> <br/>
                            <select id='pharmpref' value={ this.state.pharmacyPref } onChange={e => this.setState({pharmacyPref: e.target.value })}>
                            <option value='' disabled>Pharmacies</option>
                            {
                                 this.state.pharmacies.map((pharmacy) => 
                                <option key={ pharmacy.ID } value={ pharmacy.ID }>{ pharmacy.pharmName }</option>)
                            }
                            </select> <br/>
                        </div> : null
                        }
                        
                        {   this.state.isPharmacist === 'true' ?
                            <div id='ifPharmacist'>
                            <label htmlFor='pharmid'>Your Pharmacy</label> <br/>
                            <select id='pharmid' value={ this.state.pharmID } onChange={e => this.setState({pharmID: e.target.value })}>
                                <option value='' disabled>Pharmacies</option>
                                {
                                    this.state.pharmacies.map((pharmacy) => 
                                <option value={ pharmacy.pharmID }>{ pharmacy.pharmName }</option>)
                                }
                            </select> <br/>
                            </div>
                            : null
                        }
                        
                        <div>
                                
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

    componentDidMount() {
        this.pharmRepo.getPharmacies()
            .then(pharmacies => this.setState({ pharmacies: pharmacies }));
    }
}

export default Register;