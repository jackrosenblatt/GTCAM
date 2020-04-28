import React from 'react';
import DrNav from '../drnav/drnav';
import { Card, Container } from 'react-bootstrap';
import { DrPrescriptionRepository } from '../../api/drprescriptionRepository';
import { PharmacyRepository } from '../../api/pharmacyRepository';
import './drpres.css';
import { Link, Redirect } from "react-router-dom";
import { Prescription } from '../../models/prescription';

export class DrPrescriptionList extends React.Component {

    drpresRepo = new DrPrescriptionRepository();
    pharmRepo = new PharmacyRepository();

    constructor(props) {
        super(props);
          this.state = {
                medications: [],
                redirect: ''
          }
      }

    onEmpty(){
      return <>
      <Card>
          <Card.Header>
              You have no prescriptions!
          </Card.Header>
      </Card>
      </>;
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
        return <>
        <DrNav></DrNav>
        <p></p>
            <Container>

                <div className="card card mb-3">
                    <div className="card-header font-weight-bold text-center text-light mb-3" id='prescrip-head'>
                        <h4 id='prescrip-welcome'>Welcome to Prescription View!</h4>
                    </div>

                    <div className="card-body">
                        <p className="card-text text-center">
                            Here you can see current prescription and make a new prescriptions!
                        </p>
                    </div>
                </div>

                <h4><span id="badge-prescrip" className="float-center badge badge-info">Current Prescriptions:</span></h4>

                {
                    this.state.medications.length === 0 ? this.onEmpty() : ""
                }
            
                {
                this.state.medications.map((med) => (
                    <div key={ med.ID } className="card mb-3" id='med'>
                        <h5 className="card-header text-dark mb-3">
                            {med.medName}
                        </h5>
                        <div className="card-body">                        
                            <p className="card-text">
                                <b>Dosage: </b> { med.dosage } <br/>
                                <b>Quantity: </b> { med.quantity } <br/>
                                <b>Details: </b> { med.details } <br/>
                            </p>
                        </div>
                    </div>
                            
                ))}

          </Container>
          <br/>
          <a href="/DrPrescriptionList/request" id='makepres' className='btn btn-primary'>Make a New Prescription</a> <br/>
          <a href="/DrHome" id='return' className="btn btn-primary"> Back to Dashboard</a>
      </>;
    }

    componentWillMount() {
        this.drpresRepo.getPrescriptionsForDoctor(localStorage.getItem('id'))
            .then(prescription => this.setState({ prescription }));

        this.pharmRepo.getAllMedications()
            .then(meds => this.setState({medications: meds}));
   }

}

export default DrPrescriptionList;