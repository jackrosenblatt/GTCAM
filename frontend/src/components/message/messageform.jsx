import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { MessageRepository } from '../../api/messageRepository';
import { DoctorRepository } from '../../api/doctorRepository';
// import { PharmacistRepository } from '../../api/'

export class MessageForm extends React.Component {

    messageRepo = new MessageRepository();
    doctorRepo = new DoctorRepository();

    constructor(props) {
      super(props);
      this.state = {
          sender: '',
          receiver: '',
          message: '',
          time: '',
          doctors: []
      }
    }
    
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
                        <select
                            id="userName"
                            name="userName"
                            value={ this.state.receiver}
                            className="form-control"
                            onChange={ e => this.setState({ receiver: e.target.value})}
                            placeholder="doctor or pharmacist"
                        >
                        {
                          this.state.doctors.map(doctor => (
                            <option key={ doctor.ID } value={ doctor.name }>{ doctor.name }</option>
                          ))
                        }
                      </select>
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

  componentDidMount() {
    this.doctorRepo.getDoctors()
      .then(doctors => this.setState({ doctors: doctors}));
  }
}

export default MessageForm;