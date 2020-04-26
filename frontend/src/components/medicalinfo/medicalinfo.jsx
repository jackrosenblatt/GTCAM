import React from 'react';
import { Container, Card } from 'react-bootstrap';
import AllergyForm from './allergyform';
import Nav from '../nav/nav.jsx';
import './medicalinfo.css';
import { UserRepository } from '../../api/userRepository';
import { PharmacyRepository } from '../../api/pharmacyRepository';
import { AllergyRepository } from '../../api/allergyRepository';
import { Redirect } from 'react-router-dom';

export class MedicalInfo extends React.Component {

    userRepo = new UserRepository();
    pharmRepo = new PharmacyRepository();
    allergyRepo = new AllergyRepository();
    abortController = new AbortController();
    
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            notificationPref: '',
            pharmacyPref: '',
            ssn: '',
            userID: '',
            name: '',
            password: '',
            email: '',
            type: '',
            allergies: [],
            pharmacies: [],
            redirect: '',
            disabled: true
        }
    }

    editProfile() {
        this.setState({ disabled: false });
    }

    myAllergies() {
        return (
            <>
            <Card.Header>
                My Allergies:
                </Card.Header>
            <Card.Body>
            {
            this.state.allergies.map((allergy) =>
              <Card.Text key={ allergy.ID }>{ allergy.allergyName }</Card.Text>)
            }
            </Card.Body>
            </>
          );
    }

    onUpdateProfile() {
        if(this.state.name !== '') {
            localStorage.setItem('name', this.state.name);
        }
        if(this.state.email !== '') {
            localStorage.setItem('email', this.state.email);
        }
        var user = {
            notificationPref: this.state.notificationPref,
            pharmacyPref: this.state.pharmacyPref,
            ssn: this.state.ssn,
            name: this.state.name,
            password: this.state.password,
            email: this.state.email
        }
        this.userRepo.editUserById(localStorage.getItem('id'), user)
            .then(() => {
                this.setState({ disabled: true });
            })
            .catch(() => this.setState({ user }));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
        return <>
        <Nav></Nav>
        <p></p>
            <Container>
                <div className="card card bg-light mb-3" id='medical-header-1'>
                <div className="card-header font-weight-bold text-center mb-3" id='medical-header'>
                    <h4 id='medicalinfo'>Welcome to Your Medical Information!</h4>
                </div>
                <form id='medinfo'>
                    <label htmlFor='name'>Name</label> <br/>
                    <input type='text' disabled={ this.state.disabled } id='name' value={this.state.name} onChange={ e => this.setState({ name: e.target.value })} placeholder={ localStorage.getItem('name') }></input> <br/> 
                    <label htmlFor='email'>Email</label> <br/>
                    <input type='text' disabled={ this.state.disabled } id='email' value={ this.state.email } onChange={ e => this.setState({ email: e.target.value })} placeholder={ localStorage.getItem('email') }></input> <br/>
                    <label htmlFor='password'>Password</label> <br/>
                    <input type='text' disabled={ this.state.disabled } id='city' value={ this.state.password } onChange={ e => this.setState({ password: e.target.value })} placeholder='xxxxxxxxxx'></input> <br/>
                    <label htmlFor='pharm-pref' disabled={ this.state.disabled } value={this.state.pharmacyPref} onChange={ e => this.setState({ pharmacyPref: e.target.value })}>Pharmacy Preference</label> <br/>
                    <select id='pharm-pref' disabled={ this.state.disabled }>
                    <option value='' disabled>Pharmacies</option>
                        {
                            this.state.pharmacies.map((pharmacy) => 
                            <option key={ pharmacy.ID } value={ pharmacy.ID }>{ pharmacy.pharmName }</option>)
                        }
                    </select>  <br/>         
                    <label htmlFor='notif-pref' disabled={ this.state.disabled } value={ this.state.notificationPref } onChange={ e => this.setState({ notificationPref: e.target.value })}>Notification Preference</label> <br/>
                    <select id='notifpref' disabled={ this.state.disabled }>
                                <option value='' disabled>Notification</option>
                                <option value='0'>Off</option>
                                <option value='1'>On</option>
                    </select> <br/>
                    <label htmlFor='ssn'>Social Security Number</label>
                    <input id='ssn' type='number' disabled={ this.state.disabled } value={ this.state.ssn } onChange={ e => this.setState({ ssn: e.target.value })} placeholder='xxxxxxxxx'></input> <br/>
                    
                </form>
                <br/>
                    <button type='button' id='edit-btn' className='btn btn-primary' disabled= { ! this.state.disabled } onClick={ () => this.editProfile()  }>Edit </button><br/>
                    <button type='button' id='save-btn' className='btn btn-primary' disabled={ this.state.disabled } onClick={ () => this.onUpdateProfile() }> Save </button>
                </div>

                    {
                        this.state.allergies.length !== 0 ? <Card border="dark"> {this.myAllergies()} </Card>  : ''
                    }
                    <br/>
            <a href="/medicalinfo/allergies" id='edit-allergy' className="btn btn-primary">Edit Allergies</a>

            <p></p>
            <a href="/dashboard" id='return-dashboard' className="btn btn-primary"> Back to Dashboard</a> <br/> <br/>

            </Container>
        </>;
    }

    componentWillMount() {
        this.userRepo.getPatientById(localStorage.getItem('id'))
            .then(patient => this.setState({ patient }));

        this.pharmRepo.getPharmacies()
            .then(pharmacies => this.setState({ pharmacies: pharmacies }));

        this.allergyRepo.getAllergiesByPatient(localStorage.getItem('id'))
            .then(allergies => this.setState({ allergies: allergies }));
    }

    componentWillUnmount() {
        this.AbortController.abort();
    }
}

export default MedicalInfo;