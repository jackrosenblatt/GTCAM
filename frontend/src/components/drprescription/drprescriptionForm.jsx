import React from 'react';
import DrNav from '../drnav/drnav'; 

export class DrPrescriptionForm extends React.Component {

    state = { }

    render() {
        return <>
            <DrNav></DrNav>
                <h3 id='newprescription-header'>New Prescription</h3>
                
                <br/>
                <a href="/DrHome" id='return' className="btn btn-primary"> Back to Dashboard</a>
        </>;
    }

  componentWillMount() { }

}

export default DrPrescriptionForm;