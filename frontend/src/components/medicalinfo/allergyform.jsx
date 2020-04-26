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
        this.allergyRepo.addAllergyForPatient(localStorage.getItem('id'), this.state.addedallergy);
        var allergies1 = this.state.patientAllergies;
        allergies1.push(this.state.addedallergy)
        this.setState({patientAllergies: allergies1 });
        this.setState({ redirect: '/medicalinfo'});
    }
    
    onAllergyCreated() {
       this.allergyRepo.createNewAllergy(this.state.newAllergy);
       var allergies = this.state.allergies;
       allergies.push(this.state.newAllergy)
       this.setState({ allergies: allergies }); 
       this.setState({ redirect: '/medicalinfo'});
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
                        <label htmlFor='allergies' value={ this.state.addedallergy } onChange={ e => this.setState({ addedallergy: e.target.value })}>Select an Allergy</label> <br/>
                        <select id='allergies'>
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
                            onChange={ e => { this.setState({ newAllergy: e.target.value }); this.onAllergyCreated() }}
                            placeholder="Other Allergy"
                        ></textarea>
                        <p></p>
                    </div>

                    <div className="col-3">
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={ () => this.onAllergyAdded() }>
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