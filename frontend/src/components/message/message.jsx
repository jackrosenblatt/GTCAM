import React from 'react';
import { Container } from 'react-bootstrap';
import MessageForm from './messageform';

export class Message extends React.Component {
    state = {
        toUser: [],
        message: []
    };

    addMessage = log => {
        this.setState(state => ({
          toUser: [...state.toUser, log],
          message: [...state.message, log]
        }));
      };

    render() {
        return<>

        <p></p>
            <Container>
                <div className="card card bg-light mb-3 border-secondary">
                    <div className="card-header font-weight-bold text-center bg-secondary text-light border-secondary mb-3">
                        <h4>Welcome to Your Message Log!</h4>
                    </div>
                    
                    <div className="card-body">
                        <p className="card-text text-center">
                            Here you can log any question or concerns about your 
                            prescriptions to a doctor or a pharmacist.
                        </p>
                    </div>
                </div>

                <div className="card border-secondary mb-3">
                <h5 className="card-header text-dark border-secondary mb-3">
                    Log Board
                </h5>
                    <div className="card-body">
                        <p className="card-text">
                            <b>To: </b> message.toUser <br/>
                            <b>Message: </b> message.message <br/>

                            {this.state.toUser.map(toUser => (
                                <div>
                                    <b>To:</b>{toUser.newMessage}
                                </div>))
                            }
                            {this.state.message.map(message => (
                                <div>
                                    <b>Message:</b>{message.newMessage}
                                </div>))
                            }<br/>

                        </p>
                    </div>
                </div>

            <MessageForm  onSubmit={this.addMessage}/>

            <p></p>
            <a href="/DashBoard" className="btn btn-primary"> Back to DashBoard</a>

            </Container>
        </>;
    }
}

export default Message;