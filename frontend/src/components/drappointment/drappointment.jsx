import React from 'react';
import DrNav from '../drnav/drnav'; 

export class DrAppointment extends React.Component {

    state = { }

    render() {
      return <>
          <DrNav></DrNav>
              <h3 id='appointment-header'>All Appointments</h3>
              
              <br/>
              <a href="/DrHome" id='return' className="btn btn-primary"> Back to Dashboard</a>
      </>;
  }

  componentWillMount() { }

}

export default DrAppointment;