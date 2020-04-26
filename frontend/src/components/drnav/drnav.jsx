import React from 'react';
import { Container } from 'react-bootstrap';
import './drnav.css';

export class DrNav extends React.Component {

    render() {
        return <>

        <Container id='nav-container' fluid style={{width: '100%'}}>
                <div id='gtcam-logo-container'>   
                </div>
                <nav className="navbar navbar-expand-sm navbar-light bg-light" id='top-nav'>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav nav-pills nav-fill" id='nav-list'>

                        <li className="nav-item nav-list-item">
                            <a href="/DrHome">Home</a>
                        </li>

                        <li className='nav-item nav-list-item'>
                           <a href="/DrAppointmentList">Appointments</a>
                        </li>

                        <li className="nav-item nav-list-item">
                            <a href="/DrPatients">Patients</a>
                        </li>

                        <li className='nav-item nav-list-item'>
                            <a href="/DrPrescriptionList">Prescriptions</a>
                        </li>

                        <li className='nav-item nav-list-item'>
                            <a href="/DrPrescriptionList/request">New Prescription Form</a>
                        </li>

                    </ul>
                </div>
                </nav>
        </Container>
        </>;
    }
}

export default DrNav;