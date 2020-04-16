import React from 'react';
import { Container } from 'react-bootstrap';
import { Patient } from '../../models/patient.js';

export class MedicalInfo extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            allergies: []
        };

         this.addAllergy = this.addAllergy.bind(this);
    }

    addAllergy(e) {
        if (this._inputElement.value !== "") {
          var newAllergy = {
            text: this._inputElement.value,
            key: Date.now()
          };
       
          this.setState((prevState) => {
            return { 
              items: prevState.allergies.concat(newAllergy) 
            };
          });
         
          this._inputElement.value = "";
        }
         
        console.log(this.state.allergies);
           
        e.preventDefault();
      }

    render() {
        
        return <>

            <p></p>

            <Container>
            <form onSubmit={this.addAllergy}>
            <div className="card card bg-light mb-3 border-secondary">
                <div className="card-header font-weight-bold text-center bg-secondary text-light border-secondary mb-3">
                    <h4>Welcome to Your Medical Information!</h4>
                </div>
                
                <div className="card-body">
                    <p className="card-text">
                            <b>Name: </b> patient.name <br/>
                            <b>Address: </b> patient.address <br/>
                            <b>Doctor's Name: </b> patient.doctorname <br/>
                            <b>Medical Information: </b> patient.medicalinfo <br/>
                            <b>Current Allergies: </b> patient.allergies
                            <ul>
                                <li>peanuts</li>
                                <li>dairy</li>
                                <li>gluten</li>
                            </ul> 
                    </p>
                </div>
            </div>

            <div className="card border-secondary mb-3">
            <h5 className="card-header text-dark border-secondary mb-3">Add A New Allergy Below!</h5>
                
                <div className="card-body">
                    <div className="col-12">
                            <label htmlFor="comment"> <b>New Allegy:</b> </label>
                            <textarea 
                                className="form-control" 
                                id="exampleFormControlTextarea1" 
                                rows="3"
                                ref={(a) => this._inputElement = a}
                                placeholder="enter new allergy"
                            >
                            </textarea>
                            <p></p>
                    </div>

                    <div className="col-3">
                        <button
                            type="button"
                            className="btn btn-info"
                            onSubmit={ (newAl) => this.addAllergy(newAl) }>
                            Add
                        </button>
                    </div>

                </div>
            </div>

            <p></p>
            <a href="/DashBoard" className="btn btn-primary"> Back to DashBoard</a>
            </form>
            </Container>

        </>;
    }
}

export default MedicalInfo;