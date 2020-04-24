import React from 'react';
import Calendar from 'react-calendar';
import Nav from '../nav/nav';
import './home.css';
import { BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect
  } from 'react-router-dom';
import { UserRepository } from '../../api/userRepository';

export class Home extends React.Component {

    userRepo = new UserRepository();

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            userID: '',
            address: '',
            notificationPreference: '',
            pharmacyPreference: '',
            ssn: '',
            allergies: '',
            doctorname: '',
            medicalinfo: ''
        }
        
    }

    render() {
        if (!localStorage.getItem('id')) {
            return <Redirect to="/login" />
        }
        return <>

             <Nav></Nav>
            {/* <div>
                <h3>Welcome Back, { this.state.name }</h3>
            </div> */}
            <div>
                <Calendar id='userCal'></Calendar>
            </div>
            
            <p></p>

            <div class="container">

                <div class="card text-center">
                    <div class="card-header font-weight-bold">
                        Patient Medical Infomation
                    </div>
                    <div class="card-body">
                        <p class="card-text" >Here you will find your personal information, your doctor's name, 
                                            your medical information, and add current allergies. <br/>
                                            Click the link below to see your medical information!</p>
                        <a href="/medicalinfo" class="btn btn-info">Click Here!</a>
                    </div>
                </div>
                <p></p>

            <div class="card text-center">
                <div class="card-header font-weight-bold">
                    Patient Calendar
                </div>

                <div class="card-body">
                    <p class="card-text"> Here you can check for upcoming appointments, make an appointment,
                                        cancel an appointmnent, as well as view past appointments. <br/>
                                        Click the link below to see your calendar and appointments!</p>
                    <a href="/appointment" class="btn btn-info">Click Here!</a>
                </div>
            </div>
            <p></p>

            <div class="card text-center">
                <div class="card-header font-weight-bold">
                    Patient Prescriptions
                </div>

                <div class="card-body">
                    <p class="card-text"> Here you can see past prescriptions, current prescriptions, and 
                                        prescriptions that are ready to pick up. <br/>
                                        Click the link below to see all of your prescriptions!</p>
                    <a href="/prescriptions" class="btn btn-info">Click Here!</a>
                </div>
            </div>
            <p></p>

            <div class="card text-center">
                <div class="card-header font-weight-bold">
                    Patient Prefered Pharmacies
                </div>

                <div class="card-body">
                    <p class="card-text"> Here you can see your prefered pharmacies and their current address and store hours. <br/>
                                        Click the link below to see your prefered pharmacies!</p>
                    <a href="/pharmacies" class="btn btn-info">Click Here!</a>
                </div>
            </div>
            <p></p>

            <div class="card text-center">
                <div class="card-header font-weight-bold">
                    Patient Message Log
                </div>

                <div class="card-body">
                    <p class="card-text"> Here you can log any question or concerns about your prescriptions to a doctor or a pharmacist.
                                        Click the link below log any questons!</p>
                    <a href="/message" class="btn btn-info">Click Here!</a>
                </div>
            </div>
            <p></p>
            </div>
            <footer>
                <nav id='main-footer'>
                    <a href="/">Log Out</a>
                </nav>
            </footer>
        </>;
    }

    componentDidMount() {
        this.userRepo.getUserById(localStorage.getItem('id'))
            .then(user => this.setState({ user }));
    }
}

export default Home;