import React from 'react';
import { Container } from 'react-bootstrap';
import './nav.css';

export class Nav extends React.Component {

    render() {
        return <>

        <Container id='nav-container'>
                <div id='gtcam-logo-container'>   
                </div>
                <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="nav nav-pills nav-fill">
                        <li class="nav-item">
                            <a className='nav-link' href="/dashboard">Home</a>
                        </li>
                        <li className='nav-item'>
                           <a className='nav-link' href="/appointment">Appointments</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href="/prescriptions">Prescriptions</a>
                        </li>
                    </ul>
                </div>
                </nav>
        </Container>
        </>;
    }
}

export default Nav;