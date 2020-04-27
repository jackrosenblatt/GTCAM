import React from 'react';
import Calendar from 'react-calendar';
import PharmNav from '../pharmNav/pharmNav'; 
import { Redirect } from 'react-router-dom';
import './pharmhome.css';

export class PharmHome extends React.Component {
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
            <PharmNav></PharmNav>

            <div>
                <Calendar id='userCal'></Calendar>
            </div>
            
            <p></p>

            <div class="container">

                <div class="card text-center">
                    <div class="card-header font-weight-bold">
                        Medications 
                    </div>
                    <div class="card-body">
                        <p class="card-text" >  Here you will find all the medications available at your pharmacy. <br/>
                                                Click the link below to see medications or enter a new one!</p>
                        <a href="/Pharm/medications" id='pharm-med-home' class="btn btn-primary">Click Here!</a>
                    </div>
                </div>
                <p></p>

                <div class="card text-center">
                    <div class="card-header font-weight-bold">
                        Pharmacies
                    </div>

                    <div class="card-body">
                        <p class="card-text"> Here is a list of all the pharmacies that you have access to.<br/>
                                            Click the link below to see more information about them as well as their inventories!</p>
                        <a href="/Pharm/pharmacies" id='pharm-pharm-home' class="btn btn-primary">Click Here!</a>
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

export default PharmHome;