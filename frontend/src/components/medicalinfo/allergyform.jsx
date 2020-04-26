import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { AllergyRepository } from '../../api/allergyRepository';
import { BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect
  } from 'react-router-dom';

export class AllergyForm extends React.Component {

    allergyRepo = new AllergyRepository();

   constructor(props) {
        super(props);
        this.state = {
          patientAllergies: [],
          allergies: [],
          addedallergy: '',
          newAllergy: ''
      }
   }
    
    onAllergyAdded() {
        var allergy = {
            allergyID: this.state.addedallergy,
            patientID: localStorage.getItem('id')
        }
        this.allergyRepo.addAllergyForPatient(allergy)
            .then(resp => {
                var allergies = this.state.patientAllergies;
                allergies.push(allergy);
                this.setState({ patientAllergies: allergies });
                this.setState({ addedallergy: ''});
            });
        
        this.allergyRepo.getAllergiesByPatient(localStorage.getItem('id'))
            .then(allergies => this.setState({ patientAllergies: allergies }));
    }
    
    onAllergyCreated() {
        if(this.state.newAllergy !== '') {
            var allergy = {
                allergyName: this.state.newAllergy
            }
            console.log(allergy.allergyName);
            this.allergyRepo.createNewAllergy(allergy)
                .then(resp => {
                    this.setState({ newAllergy: ''});
                }); 
            
            this.get
        }
       
       this.allergyRepo.getAllergies()
        .then(allergies => { 
            this.setState({ allergies: allergies });
        }); 

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
        return<>
            <Card border="dark">
            <Form onSubmit={this.handleSubmit}>

                <Card.Header>
                    <b>Add A New Allergy Below!</b>
                </Card.Header>

                <Card.Body>
                    <div className="col-12">
                        <label htmlFor='allergies' >Select an Allergy</label> <br/>
                        <select id='allergies' value={ this.state.addedallergy } onChange={ e => this.setState({ addedallergy: e.target.value })}>
                            <option disabled>Allergies</option>
                          {
                             this.state.allergies.map((allergy) => 
                              <option key={ allergy.ID } value={ allergy.ID }>{ allergy.allergyName }</option> )
                          }
                        </select> <br/>
                        <label htmlFor="comment"> <b>New Allergy:</b> </label>
                        <textarea 
                            className="form-control" 
                            name="newAllergy" 
                            rows="1"
                            value={this.state.newAllergy}
                            onChange={ e => { this.setState({ newAllergy: e.target.value }) }}
                            placeholder="Other Allergy"
                        ></textarea>
                        <p></p>
                    </div>

                    <div className="col-3">
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={ () => { this.onAllergyAdded(); this.onAllergyCreated() }}>
                            Add
                        </button>
                    </div>
                </Card.Body>
                
            </Form>
            </Card>
        </>;
    }

    componentDidMount() {
        this.allergyRepo.getAllergiesByPatient(localStorage.getItem('id'))
          .then(allergies => this.setState({ patientAllergies: allergies }));
        
        this.allergyRepo.getAllergies().then(allergies => this.setState({ allergies: allergies }));
    }
}

export default AllergyForm;