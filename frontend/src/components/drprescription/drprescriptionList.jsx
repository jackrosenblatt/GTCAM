import React from 'react';
import DrNav from '../drnav/drnav';
import { Card, Container } from 'react-bootstrap';
import { DrPrescriptionRepository } from '../../api/drprescriptionRepository';
import './drpres.css';
import { Link, Redirect } from "react-router-dom";
import { Prescription } from '../../models/prescription';

export class DrPrescriptionList extends React.Component {

    drpresRepo = new DrPrescriptionRepository();

    constructor(props) {
        super(props);
          this.state = {
                prescription: [],
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
                    this.state.prescription.length === 0 ? this.onEmpty() : ""
                }
            
                {
                    this.state.prescription.map((currentpres) => (
                        <Card id='prescrip-card' key={ currentpres.patient } className="card mb-3" fluid style={{width: '93%'}}>
                            <Card.Header>
                                <b>Prescription Name:</b> {currentpres.medName}  <br/> 
                                <b>Patient Name:</b> {currentpres.patient}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title style={{float: 'right'}}>
                                <Link to={'/DrPrescriptionList/edit/' + currentpres.ID } id='edit-appt' className="btn btn-primary  mt-auto">
                                    Edit
                                </Link> 
                                </Card.Title>
                                <Card.Text>
                                    <b>Dosage:</b> { currentpres.dosage } <br/>
                                    <b>Quantity:</b> { currentpres.quantity } <br/>
                                    <b>Details:</b> { currentpres.details } <br/>
                                    <b>Directions:</b> { currentpres.directions } <br/>
                                    <b>Refill:</b> { currentpres.refillEveryXDays } <br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
          </Container>
          <br/>
          <a href="/DrPrescriptionList/request" id='makepres' className='btn btn-primary'>Make a New Prescription</a> <br/>
          <a href="/DrHome" id='return' className="btn btn-primary"> Back to Dashboard</a>
      </>;
    }

    componentWillMount() {
        this.drpresRepo.getPrescriptionsForDoctor(localStorage.getItem('id'))
            .then(prescription => this.setState({ prescription }));
   }

}

export default DrPrescriptionList;