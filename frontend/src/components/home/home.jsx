import React from 'react';
import Calendar from 'react-calendar';
import Nav from '../nav/nav';
import './home.css';
import { Link } from "react-router-dom";

export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <>
            <Nav></Nav>
            <div><Calendar id='userCal'></Calendar></div>
            <p></p>
            <Link to="/medicalinfo">Medical Info</Link> <p></p>
            <Link to="/appointment">Go to Appointment</Link> <p></p>
            <Link to="/prescriptions">Go to prescriptions</Link> <p></p>
            <Link to="/pharmacies">Show List of Pharmacies</Link> <p></p>
            <Link to="/message">Message Box</Link> 
        </>;
    }
}

export default Home;