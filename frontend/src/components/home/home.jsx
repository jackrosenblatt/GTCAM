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
            name: '',
            userID: '',
            address: '',
            type: '',
            notificationPreference: '',
            pharmacyPreference: '',
            ssn: '',
            allergies: '',
            doctorname: '',
            medicalinfo: '',
            redirect: ''
        }
        
    }

    render() {
        if (!localStorage.getItem('id')) {
            return <Redirect to="/login" />
        }
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
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

            <div className="container">

                <div className="card text-center">
                    <div className="card-header font-weight-bold">
                        Patient Medical Infomation
                    </div>
                    <div className="card-body">
                        <p className="card-text" >Here you will find your personal information, your doctor's name, 
                                            your medical information, and add current allergies. <br/>
                                            Click the link below to see your medical information!</p>
                        <a href="/medicalinfo" className="btn btn-info">Click Here!</a>
                    </div>
                </div>
                <p></p>

            <div className="card text-center">
                <div className="card-header font-weight-bold">
                    Patient Calendar
                </div>

                <div className="card-body">
                    <p className="card-text"> Here you can check for upcoming appointments, make an appointment,
                                        cancel an appointment, as well as view past appointments. <br/>
                                        Click the link below to see your calendar and appointments!</p>
                    <a href="/appointment" className="btn btn-info">Click Here!</a>
                </div>
            </div>
            <p></p>

            <div className="card text-center">
                <div className="card-header font-weight-bold">
                    Patient Prescriptions
                </div>

                <div className="card-body">
                    <p className="card-text"> Here you can see past prescriptions, current prescriptions, and 
                                        prescriptions that are ready to pick up. <br/>
                                        Click the link below to see all of your prescriptions!</p>
                    <a href="/prescriptions" className="btn btn-info">Click Here!</a>
                </div>
            </div>
            <p></p>

            <div className="card text-center">
                <div className="card-header font-weight-bold">
                    Patient Prefered Pharmacies
                </div>

                <div className="card-body">
                    <p className="card-text"> Here you can see your prefered pharmacies and their current address and store hours. <br/>
                                        Click the link below to see your prefered pharmacies!</p>
                    <a href="/pharmacies" className="btn btn-info">Click Here!</a>
                </div>
            </div>
            <p></p>

            <div className="card text-center">
                <div className="card-header font-weight-bold">
                    Patient Message Log
                </div>

                <div className="card-body">
                    <p className="card-text"> Here you can log any question or concerns about your prescriptions to a doctor or a pharmacist.
                                        Click the link below log any questons!</p>
                    <a href="/message" className="btn btn-info">Click Here!</a>
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
        console.log(localStorage.getItem('userID'));
        this.userRepo.getUserById(localStorage.getItem('userID'))
            .then(user => { this.setState({ user })
            if(user.type == 2) {
                this.setState({ redirect: '/DrHome'});
            }
            else if(user.type == 3) {
                this.setState({ redirect: '/PharmHome'});
            }
        }); 
    }
}

export default Home;