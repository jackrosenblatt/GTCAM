import React from 'react';
import { Container } from 'react-bootstrap';
import AllergyForm from './allergyform';
import Nav from '../nav/nav.jsx';
import { UserRepository } from '../../api/userRepository';
import { PharmacyRepository } from '../../api/pharmacyRepository';
import { AllergyRepository } from '../../api/allergyRepository';

export class MedicalInfo extends React.Component {

    userRepo = new UserRepository();
    pharmRepo = new PharmacyRepository();
    allergyRepo = new AllergyRepository();
    
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
            disabled: true
        }
    }

    editProfile() {
        this.setState({ disabled: false });
    }

    myAllergies() {
        return (
            <>
            <p>Your Allergies:</p>
            {
            this.state.allergies.map((allergy) =>
              <p key={ allergy.ID }>{ allergy.allergyName }</p>)
            }
            </>
          );
    }

    onUpdateProfile() {
        var user = {
            notificationPref: this.state.notificationPref,
            pharmacyPref: this.state.pharmacyPref,
            ssn: this.state.ssn,
            name: this.state.name,
            password: this.state.password,
            email: this.state.email
        }
        this.userRepo.editUserById(this.state.userID, user)
            .then(() => {
                localStorage.setItem('name', this.state.name);
                localStorage.setItem('email', this.state.email);
            })
            .catch(() => this.setState({ user }));
    }

    render() {
        return <>
        <Nav></Nav>
        <p></p>
            <Container>
                <div className="card card bg-light mb-3 border-secondary">
                <div className="card-header font-weight-bold text-center bg-secondary text-light border-secondary mb-3">
                    <h4>Welcome to Your Medical Information!</h4>
                </div>
                <form>
                    <label htmlFor='name'>Name</label> <br/>
                    <input type='text' disabled={ this.state.disabled } id='name' value={this.state.name} onChange={ e => this.setState({ name: e.target.value })} placeholder={ localStorage.getItem('name') }></input> <br/> 
                    <label htmlFor='email'>Email</label> <br/>
                    <input type='text' disabled={ this.state.disabled } id='email' value={ this.state.email } onChange={ e => this.setState({ email: e.target.value })} placeholder={ localStorage.getItem('email') }></input> <br/>
                    <label htmlFor='password'>Password</label> <br/>
                    <input type='text' disabled={ this.state.disabled } id='city' value={ this.state.password } onChange={ e => this.setState({ password: e.target.value })} placeholder='xxxxxxxxxx'></input> <br/>
                    <label htmlFor='pharm-pref' value={this.state.pharmacyPref} onChange={ e => this.setState({ pharmacyPref: e.target.value })}>Pharmacy Preference</label> <br/>
                    <select id='pharm-pref'>
                    <option value='' disabled>Pharmacies</option>
                        {
                            this.state.pharmacies.map((pharmacy) => 
                            <option key={ pharmacy.ID } value={ pharmacy.ID }>{ pharmacy.pharmName }</option>)
                        }
                    </select>  <br/>         
                    <label htmlFor='notif-pref' value={ this.state.notificationPref } onChange={ e => this.setState({ notificationPref: e.target.value })}>Notification Preference</label> <br/>
                    <select id='notifpref'>
                                <option value='' disabled>Notification</option>
                                <option value='0'>Off</option>
                                <option value='1'>On</option>
                    </select> <br/>
                    <label htmlFor='ssn'>Social Security Number</label>
                    <input id='ssn' type='number' disabled={ this.state.ssn } value={ this.state.ssn } onChange={ e => this.setState({ ssn: e.target.value })} placeholder='xxxxxxxxx'></input> <br/>
                    
                </form>
                <br/>
                    <button type='button' className='btn btn-primary' disabled= { ! this.state.disabled } onClick={ () => this.editProfile()  }>Edit </button> <br/> <br/>
                    <button type='button' className='btn btn-primary' disabled={ this.state.disabled } onClick={ () => this.onUpdateProfile() }> Save </button>
                </div>
                <div>

                    {
                        this.state.allergies.length !== 0 ? this.myAllergies() : ''
                    }

                </div>

            <AllergyForm/>

            <p></p>
            <a href="/dashboard" className="btn btn-primary"> Back to Dashboard</a>

            </Container>
        </>;
    }

    componentDidMount() {
        this.userRepo.getPatientById(localStorage.getItem('id'))
            .then(patient => this.setState({ patient }));

        this.pharmRepo.getPharmacies()
            .then(pharmacies => this.setState({ pharmacies: pharmacies }));

        this.allergyRepo.getAllergiesByPatient(localStorage.getItem('id'))
        .then(allergies => this.setState({ allergies: allergies }));
    }
}

export default MedicalInfo;