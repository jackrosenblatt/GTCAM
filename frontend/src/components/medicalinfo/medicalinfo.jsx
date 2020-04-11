import React from 'react';
import { Link } from "react-router-dom";

export class MedicalInfo extends React.Component {

    render() {
        return <>
            <h6>Welcome to Your Medical Information</h6>
            <p></p>
            <Link to="/DashBoard">DashBoard</Link> <p></p>
        </>;
    }
}

export default MedicalInfo;