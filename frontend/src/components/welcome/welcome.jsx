import React from 'react';
import { Link } from "react-router-dom";

export class Welcome extends React.Component {

    render() {
        return <>
            <h1>Welcome to GTCAM</h1>
            <h3>Lets Help You Make Medicine Easier</h3>
            <Link to="/login">Login</Link>
            <p></p>
            <Link to="/register">Register for an Account</Link>
        </>;
    }
}

export default Welcome;