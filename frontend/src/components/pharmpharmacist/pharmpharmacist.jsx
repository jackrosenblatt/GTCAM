import React from 'react';
import { PharmacyRepository } from '../../api/pharmacyRepository';
import { Container } from 'react-bootstrap';
import PharmNav from '../pharmNav/pharmNav';
import { Link } from "react-router-dom";
import './pharmpharm.css';

export class PharmPharmacist extends React.Component {

    pharmRepo = new PharmacyRepository();
    constructor(props) {
        super(props);
        this.state = {
            pharmacies: []
        }
    }

    render() {
        return <>
        <PharmNav></PharmNav>
        <br/>
        <Container>
            <div className="font-weight-bold text-center mb-3" id='pharm-h'>
                <h4>Welcome to Your List of Pharmacies!</h4>
            </div>
            
        {
            this.state.pharmacies.map((pharmacy) => (
                <div key={ pharmacy.ID } className="card mb-3" id='pharm'>
                    <h5 className="card-header text-dark mb-3">
                        {pharmacy.pharmName}
                    </h5>
                    <div className="card-body">
                        <div className="card-title" style={{float: 'right'}}>
                        <Link to={'/Pharm/pharmacies/' + pharmacy.ID } id='inventory-btn' className="btn btn-primary mt-auto">
                            View Inventory
                        </Link>                        
                        </div>
                        <p className="card-text">
                            <b>Address: </b> { pharmacy.pharmAddress } <br/>
                            <b>Hours of Operation: </b> { pharmacy.pharmHours } <br/>
                            <b>Contact: </b> { pharmacy.phoneNumber } <br/>
                        </p>
                    </div>
                </div>
                        
            ))
                }
            <a href="/PharmHome" id='return-phaarm' className="btn btn-primary"> Back to Dashboard</a>
                <br/><br/>
            </Container>
        </>;
    }

    componentDidMount() {
        this.pharmRepo.getPharmacies()
            .then(pharmacies => this.setState({ pharmacies }));
    }
}

export default PharmPharmacist;