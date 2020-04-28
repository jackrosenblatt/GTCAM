import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, 
  Route, 
  Switch,
  Redirect
} from 'react-router-dom';

//Links
import Home from './components/home/home';
import Login from './components/login/login';
import Welcome from './components/welcome/welcome';
import Register from './components/register/register';
import MedicalInfo from './components/medicalinfo/medicalinfo';
import AppointmentList from './components/appointment/appointmentList';
import PrescriptionList from './components/prescription/prescriptionList';
import Pharmacies from './components/pharmacies/pharmacies';
import Message from './components/message/message';
import MessageForm from './components/message/messageform';
import pharmHome from './components/pharmHome/pharmHome';
import AppointmentForm from './components/appointment/appointmentForm';
import AppointmentEdit from './components/appointment/appointmentEdit';
import AllergyForm from './components/medicalinfo/allergyform';

import DrHome from './components/drhome/drhome';
import DrAppointmentList from './components/drappointment/drappointmentList';
import DrPatients from './components/drpatients/drpatients';
import DrPrescriptionList from './components/drprescription/drprescriptionList';
import DrPrescriptionForm from './components/drprescription/drprescriptionForm';
import DrPrescriptionEdit from './components/drprescription/drprescriptionEdit';

import PharmPharmacist from './components/pharmpharmacist/pharmpharmacist';
import PharmInventory from './components/pharminventory/pharminventory';
import PharmMedications from './components/pharmmedications/pharmmedications';
import PharmNewMed from './components/pharmmedications/pharmnewmed';
import EditSub from './components/prescription/editSub';

class App extends Component {
  render() {
    return (
      <>
      <Router>
          <Switch>
            <Route exact path="/" component={ Welcome } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/DashBoard" component={ Home } />
            <Route exact path="/medicalinfo" component={ MedicalInfo} />
            <Route exact path="/prescriptions" component={ PrescriptionList } />
            <Route exact path="/prescriptions/updateSub/:presid" component={ EditSub } />

            <Route exact path="/pharmacies" component= { Pharmacies} />
            <Route exact path="/message" component= { Message }/>
            <Route exact path="/PharmHome" component={ pharmHome }   />
            <Route exact path="/medicalinfo/allergies" component={ AllergyForm } />
            <Route exact path="/appointment" component= { AppointmentList } />
            <Route exact path="/appointment/request" component={ AppointmentForm } />
            <Route exact path="/appointment/edit/:apptid" render={(props) => <AppointmentEdit {...props} />} />
            <Route exact path="/message/new" component={ MessageForm } />


            {/* DOCTOR ROUTING */}
            <Route exact path="/DrHome" component={ DrHome }   />
            <Route exact path="/DrAppointmentList" component={ DrAppointmentList } />

            <Route exact path="/DrPatients" component={ DrPatients } />

            <Route exact path="/DrPrescriptionList" component={ DrPrescriptionList } />
            <Route exact path="/DrPrescriptionList/request" component={ DrPrescriptionForm } />
            <Route exact path="/DrPrescriptionList/edit/:medid" render={(props) => <DrPrescriptionEdit {...props} />} />

            <Route exact path="/Pharm/pharmacies" component={ PharmPharmacist } />
            <Route exact path="/Pharm/pharmacies/:pharmid" render={(props) => <PharmInventory {...props} />} />
            <Route exact path="/Pharm/medications" component={ PharmMedications} />
            <Route exact path="/Pharm/medications/create" component={ PharmNewMed }/>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
