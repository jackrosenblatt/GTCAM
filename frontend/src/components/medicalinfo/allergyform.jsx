import React from 'react';
import { Card, Form } from 'react-bootstrap';


export class AllergyForm extends React.Component {

    state = {
        newAllergy: " "
      };
    
      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
    
      handleSubmit = event => {
        event.preventDefault();

        this.props.onSubmit({
          newAllergy: this.state.newAllergy
        });

        this.setState({
          newAllergy: ""
        });

      };

    render() {
        return<>
            <Card border="dark">
            <Form onSubmit={this.handleSubmit}>

                <Card.Header>
                    <b>Add A New Allergy Below!</b>
                </Card.Header>

                <Card.Body>
                    <div className="col-12">
                        <label htmlFor="comment"> <b>New Allegy:</b> </label>
                        <textarea 
                            className="form-control" 
                            name="newAllergy" 
                            rows="3"
                            value={this.state.newAllergy}
                            onChange={this.handleChange}
                            placeholder="new allergy"
                        ></textarea>
                        <p></p>
                    </div>

                    <div className="col-3">
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={ this.handleSubmit }>
                            Add
                        </button>
                    </div>
                </Card.Body>
                
            </Form>
            </Card>
        </>;
    }
}

export default AllergyForm;