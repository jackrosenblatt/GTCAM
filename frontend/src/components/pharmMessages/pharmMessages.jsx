import React from 'react';
import { Container } from 'react-bootstrap';
import PharmMessageForm from './pharmMessageForm';
import PharmNav from '../pharmNav/pharmNav'; 
import './pharmMessages.css';
import { MessageRepository } from '../../api/messageRepository';

export class PharmMessage extends React.Component {
    
    messageRepo = new MessageRepository();

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    onDelete(messageId) {
        if(window.confirm("Are you sure you want to delete this account?")) {
            this.messageRepo.cancelMessagetById(messageId)
            .then(() => {
                this.setState({
                    messages: this.state.accounts.filter(x => x.id !== messageId)
                });
                alert('Account deleted');
            });
        }
    }

    render() {
        return<>
        <PharmNav></PharmNav>
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
                                    {/* <button type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={ e => this.state.onDelete(message.id) }>
                                        X
                                    </button> */}
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

            <a href='/Pharmmessage/new' id='message' className='btn btn-primary'> Add A Message</a> <br/>
            <a href="/pharmHome" id='return-dash' className="btn btn-primary"> Back to Dashboard</a> <br/> <br/>

            </Container>
        </>;
    }

    componentDidMount() {
        this.messageRepo.getMessagesForUser(localStorage.getItem('id'))
            .then(messages => this.setState({ messages: messages}));
    }
}

export default PharmMessage;