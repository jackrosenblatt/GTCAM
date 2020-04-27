import React from 'react';
import { Container } from 'react-bootstrap';
import './nav.css';

export class Nav extends React.Component {

    render() {
        return <>

        <Container id='nav-container' fluid style={{width: '100%'}}>
                <div id='gtcam-logo-container'>   
                </div>
                <nav className="navbar navbar-expand-sm navbar-light bg-light" id='top-nav'>
                <div className="navbar-collapse" id="navbarNav">
                    <ul className="nav nav-pills nav-fill" id='nav-list'>
                        <li className="nav-item nav-list-item">
                            <a href="/dashboard">Home</a>
                        </li>
                        <li className='nav-item nav-list-item'>
                           <a href="/appointment">Appointments</a>
                        </li>
                        <li className='nav-item nav-list-item'>
                            <a href="/prescriptions">Prescriptions</a>
                        </li>
                        <li className='nav-item nav-list-item'>
                            <a href="/medicalinfo">Medical Information</a>
                        </li>
                        <li className='nav-item nav-list-item'>
                            <a href="/pharmacies">Pharmacies</a>
                        </li>
                        <li className='nav-item nav-list-item'>
                            <a href="/message">Messages</a>
                        </li>
                    </ul>
                </div>
                </nav>
        </Container>
        </>;
    }
}

export default Nav;