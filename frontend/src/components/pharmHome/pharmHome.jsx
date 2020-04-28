import React from 'react';
import Calendar from 'react-calendar';
import PharmNav from '../pharmNav/pharmNav'; 
import { Redirect } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import './pharmhome.css';
import { PharmacyRepository } from '../../api/pharmacyRepository';

export class PharmHome extends React.Component {
    
    pharmRepo = new PharmacyRepository();

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            medications: [],
            name: ''
        }
        
    }

    onLow() {
        return <>
        <Card fluid style={{width: '90%'}}>
            <Card.Header>
                <b>You have no medications low in stock!</b>
            </Card.Header>
        </Card>
        </>;
    }

    onNoLow() {
        return <>
        <Card fluid style={{width: '90%'}}>
            <Card.Header>
                <b>Below are medications low on stock</b>
            </Card.Header>
        </Card>
        </>;
    }

    render() {
        if (!localStorage.getItem('id')) {
            return <Redirect to="/login" />
        }
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
        return <>
            <PharmNav></PharmNav>

            <div>
                <Calendar id='userCal'></Calendar>
            </div>
            
            <p></p>

            <div class="container">

                <br/><h4><span id='badge-pickup' className="float-center badge badge-info">Notifications:</span></h4><br/>
                    {
                        this.state.medications.length === 0 ? this.onLow() : ""
                    } 
                    {
                        this.state.medications.length !== 0 ? this.onNoLow() : ""
                    } <br/>
                <br/>
                {
                    this.state.medications.map((med) => (
                        <Card key={med.id} fluid style={{width: '90%'}} id='prescription-card'>
                            <Card.Header id='prescription-card-header'>
                                    <b>Name: </b>{med.medName}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text id='prescription-text'>
                                    Quantity{ med.quantity}. <br/>
                                </Card.Text>           
                            </Card.Body>
                        </Card>
                        
                    ))
                }
                <p></p>
                
                <br/><h4><span id='badge-pickup' className="float-center badge badge-info">Resouces:</span></h4><br/>

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

                <div class="card text-center">
                    <div class="card-header font-weight-bold">
                        Message Log
                    </div>

                    <div class="card-body">
                        <p class="card-text"> Here you can log any question or concerns about your prescriptions to a doctor or a pharmacist.
                                        Click the link below log any questons!</p>
                        <a href="/Pharmmessage" id='pharm-pharm-home' class="btn btn-primary">Click Here!</a>
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

    // componentDidMount() { 
    //     this.pharmRepo.getLowMedications(localStorage.getItem('id'))
    //         .then(prescrip => this.setState({ medications: prescrip}));
    // }
}

export default PharmHome;