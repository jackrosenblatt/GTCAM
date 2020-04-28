import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { MessageRepository } from '../../api/messageRepository';
import { DoctorRepository } from '../../api/doctorRepository';
import { Redirect } from 'react-router-dom';
import PharmNav from '../pharmNav/pharmNav'; 
import { PharmacistRepository } from '../../api/pharmacistReposity';

export class PharmMessageForm extends React.Component {

    messageRepo = new MessageRepository();
    doctorRepo = new DoctorRepository();
    pharmRepo = new PharmacistRepository();

    constructor(props) {
      super(props);
      this.state = {
          sender: '',
          receiver: '',
          message: '',
          time: '',
          redirect: '',
          doctors: [],
          pharmacists: []
      }
    }

    createMessage() {
      var currentDate = new Date();
      var date = ('0' + currentDate.getDate()).slice(-2);
      var month = ('0' + (currentDate.getMonth()+1)).slice(-2);
      var year = currentDate.getFullYear();
      var dateString = year + "-" + month + "-" + date;
      var hh = currentDate.getHours();
      var mm = currentDate.getMinutes();
      var ss = currentDate.getSeconds();
      var time = dateString +' '+ hh +':'+ mm +':'+ ss;
      var message = {
          sender: localStorage.getItem('id'),
          receiver: this.state.receiver,
          message: this.state.message,
          time: time
      }
      this.messageRepo.createMessage(message)
          .then(resp => {
            this.setState({receiver: '' });
            this.setState({ message: ''});
            this.setState({ redirect: '/Pharmmessage'});
        });
    }
    
  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />
  }
      return<>
      <PharmNav></PharmNav>
      <br/>
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
                            <option key={ doctor.ID } value={ doctor.ID }>{ doctor.name }</option>
                          ))
                        }
                        {
                          this.state.pharmacists.map(pharmacist => (
                            <option key={ pharmacist.ID } value={ pharmacist.ID }>{ pharmacist.name }</option>
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
                          onChange={ e=> this.setState({ message: e.target.value})}
                      ></textarea>
                      <p></p>
                  </div>

                  <div className="col-3">
                      <button
                          type="button"
                          className="btn btn-info"
                          onClick={ () => this.createMessage() }>
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

    this.pharmRepo.getPharmacist()
      .then(pharmacists => this.setState({ pharmacists: pharmacists}));
  }
}

export default PharmMessageForm;