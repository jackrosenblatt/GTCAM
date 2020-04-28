import React from 'react';
import { Card, Container } from 'react-bootstrap';
import Nav from '../nav/nav';
import { Prescription } from '../../models/prescription';
import './prescription.css';
import { PrescriptionRepository } from '../../api/prescriptionRepository';
import { Redirect , Link} from 'react-router-dom';


export class PrescriptionList extends React.Component {
    
    prescripRepo = new PrescriptionRepository();
    constructor(props) {
        super(props);
        this.state = {
            all_prescriptions: [],
            pickup_prescriptions: [],
            redirect: ''
        }
    }

    onEmpty() {
        return <>
        <Card fluid style={{width: '90%'}}>
            <Card.Header>
                You have no prescriptions!
            </Card.Header>
        </Card>
        </>;
    }

    onNoPickup() {
        return <>
        <Card fluid style={{width: '90%'}}>
            <Card.Header>
                You have no prescriptions to pick up!
            </Card.Header>
        </Card>
        </>;
    }

    render() {
        return <>
        <Nav></Nav>
        <Container className='justify-content-md-center'>
        <h3 id='prescription-header'>Your Prescriptions</h3>
        <br/><h4><span id='badge-pickup' className="float-center badge badge-info">Prescriptions Ready for Pickup:</span></h4><br/>
        {
            this.state.pickup_prescriptions.length === 0 ? this.onNoPickup() : ""
        }
        {
            this.state.pickup_prescriptions.map((prescription) => (
                <Card key={prescription.id} fluid style={{width: '90%'}} id='prescription-card'>
                    <Card.Header id='prescription-card-header'>
                            {prescription.medName}:  {prescription.dosage }
                    </Card.Header>
                    <Card.Body>
                        <Card.Title id='prescription-title'>
                            { prescription.directions }, total prescribed: { prescription.quantity } doses
                            <Link to={'/prescriptions/updateSub/' + prescription.ID } style={{float: 'right'}} id='edit-appt' className="btn btn-primary  mt-auto">
                                     Change Pick Up Person!
                            </Link> <br/>
                            {/* <Link to={'/prescriptions/pickup/' + prescription.ID } style={{float: 'right'}} id='edit-appt' className="btn btn-primary  mt-auto">
                                     Change Pick Up Time!
                            </Link> */}
                        </Card.Title>
                        <Card.Text id='prescription-text'>
                            Prescribed by Dr. { prescription.doctor}. { prescription.details }.
                            Ready for pickup at { prescription.pharmName }. <br/>
                            Subtitute Retriever: {prescription.subRetriever}
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
                
            ))
        }
        <br/><h4><span id='badge-all' className="float-center badge badge-info">All Prescriptions:</span></h4><br/>

        {
            this.state.all_prescriptions.length === 0 ? this.onEmpty() : ""
        }
        {
            
            this.state.all_prescriptions.map((prescription) => (
                <Card key={prescription.id} fluid style={{width: '90%'}} id='prescription-card'>
                    <Card.Header id='prescription-card-header'>
                            {prescription.medName}:  {prescription.dosage }
                    </Card.Header>
                    <Card.Body>
                        <Card.Title id='prescription-title'>
                            { prescription.directions }, total prescribed: { prescription.quantity } doses
                        </Card.Title>
                        <Card.Text id='prescription-text'>
                            Prescribed by Dr. { prescription.doctor}. { prescription.details }.
                            Refill at { prescription.pharmName } every { prescription.refillEveryXDays } days.
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
                
            ))
        }

        <br/><h4><span id='badge-all' className="float-center badge badge-info">Prescription Pick Up History</span></h4><br/>

        {
            this.state.all_prescriptions.length === 0 ? this.onEmpty() : ""
        }
        {
            
            this.state.all_prescriptions.map((prescription) => (
                <Card key={prescription.id} fluid style={{width: '90%'}} id='prescription-card'>
                    <Card.Header id='prescription-card-header'>
                            {prescription.medName}:  {prescription.dosage }
                    </Card.Header>
                    <Card.Body>
                        <Card.Title id='prescription-title'>
                            Pharmacy Name: { prescription.pharmName }
                        </Card.Title>
                        <Card.Text id='prescription-text'>
                            Pharmacy Hours: {prescription.pharmHours} <br/>
                            Pharmacy Address: {prescription.pharmAddress}<br/>
                            Pharmacy PhoneNumber: {prescription.pharmPhoneNumber}<br/>
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
                
            ))
        }

        </Container>
        <br/>
        <a href="/DashBoard" id='return-dashB' className="btn btn-primary"> Back to Dashboard</a>
        <br/> <br/>
        </>;
    }

    componentDidMount() {
        this.prescripRepo.getPrescriptionsForPatient(localStorage.getItem('id'))
            .then(prescrip => this.setState({ all_prescriptions: prescrip }));

        this.prescripRepo.getPrescriptionsToPickupForPatient(localStorage.getItem('id'))
            .then(prescrip => this.setState({ pickup_prescriptions: prescrip}));

    }

}

export default PrescriptionList;