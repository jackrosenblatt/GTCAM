import React from 'react';
import { Container } from 'react-bootstrap';
import MessageForm from './messageform';
import Nav from '../nav/nav.jsx';
import { MessageRepository } from '../../api/messageRepository';

export class Message extends React.Component {
    
    messageRepo = new MessageRepository();
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    render() {
        return<>
        <Nav></Nav>
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
                            {
                                this.state.messages.map(message => (
                                <div>
                                    <b>To: </b>{ message.receiver } <br/>
                                    <b>From: </b>{ message.sender } <br/>
                                    <b>Message: </b>{ message.message } <br/>
                                    <b>Time: </b>{ message.time }
                                </div>))
                            }
                            <br/>
                        </p>
                    </div>
                </div>

            <MessageForm  onSubmit={this.addMessage}/>

            <p></p>
            <a href="/DashBoard" className="btn btn-primary"> Back to DashBoard</a>

            </Container>
        </>;
    }

    componentDidMount() {
        this.messageRepo.getMessagesForUser(localStorage.getItem('id'))
            .then(messages => this.setState({ messages: messages}));
    }
}

export default Message;