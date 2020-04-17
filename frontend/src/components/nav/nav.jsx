import React from 'react';
import { Container } from 'react-bootstrap';
import './nav.css';

export class Nav extends React.Component {

    render() {
        return <>

        <Container id='nav-container' fluid style={{width: '100%'}}>
                <div id='gtcam-logo-container'>   
                </div>
                <nav class="navbar navbar-expand-sm navbar-light bg-light" id='top-nav'>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="nav nav-pills nav-fill" id='nav-list'>
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