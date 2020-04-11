import React from 'react';
import { Container } from 'react-bootstrap';
import './nav.css';

export class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <>
        <Container className='bg-light'>
                <nav className='navbar navbar-expand-lg navbar-light bg-light' id='main-nav'>
                    <a className='navbar-brand' id='brand-name'>GTCAM</a>
                    {/* <ul className='navbar-nav mr-auto' id='links-list'>
                        <li className='nav-item active'>
                            <a className='nav-link'>Home</a>
                        </li>
                    </ul> */}
                </nav>
        </Container>
        <div className='sidenav'>
            <div id='profilepic'>
            </div>
            <a href='#'>Profile</a>
            <a href='#'>Calendar</a>
            <a href='#'>Appointments</a>
            <a href='#'>Prescriptions</a>
        </div>
        </>;
    }
}

export default Nav;