import React from 'react';
import Calendar from 'react-calendar';
import DrNav from '../drnav/drnav'; 

export class DrHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            name: ''
        }
        
    }

    render() {
        return <>

             <DrNav></DrNav>

            <div>
                <Calendar id='userCal'></Calendar>
            </div>
            
            <p></p>

            <div class="container">

                <div class="card text-center">
                    <div class="card-header font-weight-bold">
                        Appointments
                    </div>

                    <div class="card-body">
                        <p class="card-text"> Here you can check for upcoming appointments, make an appointment,
                                            cancel an appointmnent, as well as view past appointments. <br/>
                                            Click the link below to see your calendar and appointments!</p>
                        <a href="/drappointment" class="btn btn-info">Click Here!</a>
                    </div>
                </div>
                <p></p>

                <div class="card text-center">
                    <div class="card-header font-weight-bold">
                        All Patients 
                    </div>
                    <div class="card-body">
                        <p class="card-text" >  Here you will find all of your patients 
                                                and their medical information. <br/>
                                                Click the link below to see your all of your patients!</p>
                        <a href="#" class="btn btn-info">Click Here!</a>
                    </div>
                </div>
                <p></p>

                <div class="card text-center">
                    <div class="card-header font-weight-bold">
                        Prescriptions
                    </div>

                    <div class="card-body">
                        <p class="card-text"> Here you can see past prescriptions, current prescriptions, and 
                                            make a new prescriptions <br/>
                                            Click the link below to see all of your prescriptions!</p>
                        <a href="#" class="btn btn-info">Click Here!</a>
                    </div>
                </div>
                <p></p>

            </div>
            <footer>
                <nav id='main-footer'>
                    <a href="/">Log Out</a>
                </nav>
            </footer>
        </>;
    }
}

export default DrHome;