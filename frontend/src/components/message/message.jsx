import React from 'react';
import { Container } from 'react-bootstrap';
import MessageForm from './messageform';
import Nav from '../nav/nav.jsx';
import './message.css';
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
                <div className="card card mb-3 " id='mess-h1'>
                    <div className="card-header font-weight-bold text-center mb-3" id='mess-h'>
                        <h4 id='message-head'>Welcome to Your Message Log!</h4>
                    </div>
                    
                    <div className="card-body">
                        <p className="card-text text-center">
                            Here you can log any question or concerns about your 
                            prescriptions to a doctor or a pharmacist.
                        </p>
                    </div>
                </div>

                <div className="card mb-3">
                <h5 className="card-header text-dark mb-3">
                    Log Board
                </h5>
                    <div className="card-body">
                        <div className="card-text">
                            {
                                this.state.messages.map(message => (
                                <div>
                                    <b>To: </b>{ message.receiver } <br/>
                                    <b>From: </b>{ message.sender } <br/>
                                    <b>Message: </b>{ message.message } <br/>
                                    <b>Time: </b>{ message.time }
                                    <hr></hr>
                                </div>))
                            }
                            <br/>
                        </div>
                    </div>
                </div>

            <a href='/message/new' id='message' className='btn btn-primary'> Add A Message</a> <br/>
            <a href="/DashBoard" id='return-dash' className="btn btn-primary"> Back to Dashboard</a> <br/> <br/>

            </Container>
        </>;
    }

    componentDidMount() {
        this.messageRepo.getMessagesForUser(localStorage.getItem('id'))
            .then(messages => this.setState({ messages: messages}));
    }
}

export default Message;