import React from 'react';
import { Container } from 'react-bootstrap';

export class Message extends React.Component {
    
    onReviewSubmit(){

    }

    render(){
        return <>
            <p></p>
            <Container>

                <div className="card card bg-light mb-3 border-secondary">
                    <div className="card-header font-weight-bold text-center bg-secondary text-light border-secondary mb-3">
                        <h4>Welcome to Your Message Log!</h4>
                    </div>

                    <div className="card-body">
                    <p className="text-center">
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
                        </p>
                    </div>
                </div>
                
                <div className="card border-secondary mb-3">
                <form>
                
                <div className="card-body">
                <div className="row">

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
                        <label htmlFor="comment"><b>Message:</b></label>
                        <textarea className="form-control" 
                            id="comment" 
                            name="comment"
                            rows="3"
                            placeholder="enter problem">
                        </textarea>
                        <p></p>
                    </div>

                    <div className="col-6">
                        <button
                        type="button"
                        className="btn btn-primary"
                        onClick={ () => this.onReviewSubmit() }>
                        Submit Message
                    </button>
                    </div>

                </div>
                </div>
                </form>
                </div>

                <p></p>
                <a href="/DashBoard" className="btn btn-primary"> Back to DashBoard</a>
                
            </Container>
        </>;
    }
}

export default Message;