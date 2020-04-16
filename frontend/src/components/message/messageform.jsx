import React from 'react';
import { Card, Form } from 'react-bootstrap';

export class MessageForm extends React.Component {

    state = {
        newMessage: ""
      };
    
      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
    
      handleSubmit = event => {
        event.preventDefault();

        this.props.onSubmit({
          newMessage: this.state.newMessage
        });

        this.setState({
          newMessage: ""
        });

      };

    render() {
        return<>
            <Card border="dark">
            <Form onSubmit={this.handleSubmit}>

                <Card.Header>
                    <b>Add A New Message!</b>
                </Card.Header>

                <Card.Body>
                  <div className="col-8">
                      <div className="form-group">
                      <label htmlFor="userName"><b>Addressed To: </b></label>
                          <input type="text"
                              id="userName"
                              name="userName"
                              className="form-control"
                              placeholder="doctor or pharmacist"
                          />
                      </div>
                  </div>

                    <div className="col-12">
                        <label htmlFor="comment"> <b>New Message:</b> </label>
                        <textarea 
                            className="form-control" 
                            name="newMessage" 
                            rows="3"
                            placeholder="new message"
                            value={this.state.newMessage}
                            onChange={this.handleChange}
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

export default MessageForm;