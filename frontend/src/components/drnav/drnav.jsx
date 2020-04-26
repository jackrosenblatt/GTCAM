import React from 'react';
import { Container } from 'react-bootstrap';
import './drnav.css';

export class DrNav extends React.Component {

    render() {
        return <>

        <Container id='nav-container' fluid style={{width: '100%'}}>
                <div id='gtcam-logo-container'>   
                </div>
                <nav class="navbar navbar-expand-sm navbar-light bg-light" id='top-nav'>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="nav nav-pills nav-fill" id='nav-list'>

                        <li class="nav-item nav-list-item">
                            <a href="/DrHome">Home</a>
                        </li>

                        <li className='nav-item nav-list-item'>
                           <a href="/DrAppointmentList">Appointments</a>
                        </li>

                        <li class="nav-item nav-list-item">
                            <a href="/DrPatients">Patients</a>
                        </li>

                        <li className='nav-item nav-list-item'>
                            <a href="/DrPrescription">Prescriptions</a>
                        </li>

                        <li className='nav-item nav-list-item'>
                            <a href="/DrNewPrescription">New Prescription Form</a>
                        </li>

                    </ul>
                </div>
                </nav>
        </Container>
        </>;
    }
}

export default DrNav;