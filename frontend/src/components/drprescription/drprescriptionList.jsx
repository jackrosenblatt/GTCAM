import React from 'react';
import DrNav from '../drnav/drnav'; 

export class DrPrescriptionList extends React.Component {

    state = { }

    render() {
        return <>
            <DrNav></DrNav>
                <h3 id='prescription-header'>Prescription</h3>
                
                <br/>
                <a href="/DrHome" id='return' className="btn btn-primary"> Back to Dashboard</a>
        </>;
    }

  componentWillMount() { }

}

export default DrPrescriptionList;