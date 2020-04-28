import React from 'react';
import Calendar from 'react-calendar';
import pharmNav from '../pharmNav/pharmNav'; 
import { BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect
  } from 'react-router-dom';

export class pharmHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            name: ''
        }
        
    }

    render() {
        if (!localStorage.getItem('id')) {
            return <Redirect to="/login" />
        }
        return <>

             <pharmNav></pharmNav>
            
            <p></p>

            <div class="container">

                <div class="card text-center">
                    <div class="card-header font-weight-bold">
                        All Patients 
                    </div>
                    <div class="card-body">
                        <p class="card-text" >  Here you will find all the patients picking up a medication at your pharmacy. <br/>
                                                Click the link below to see your all of the patients!</p>
                        <a href="/PharmPatientList" class="btn btn-info">Click Here!</a>
                    </div>
                </div>
                <p></p>

                <div class="card text-center">
                    <div class="card-header font-weight-bold">
                        Prescriptions
                    </div>

                    <div class="card-body">
                        <p class="card-text"> Here is a list of all the medications in stock<br/>
                                            Click the link below to see all of the perscriptions</p>
                        <a href="/PharmStock" class="btn btn-info">Click Here!</a>
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

export default pharmHome;