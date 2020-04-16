import React from 'react';
import { Container } from 'react-bootstrap';
import './nav.css';

export class Nav extends React.Component {

    render() {
        return <>

        <Container className='bg-light' id='nav-container'>
                <div id='gtcam-logo-container'>
                    
                </div>
                    {/* <ul className='navbar-nav mr-auto' id='links-list'>
                        <li className='nav-item active'>
                            <a className='nav-link'>Home</a>
                        </li>
                    </ul> */}
                {/* </nav> */}
        </Container>
        <div className='sidenav'>
            <div id='profilepic'>
                <h5>Notifications</h5>
            </div>
        </div>
        </>;
    }
}

export default Nav;