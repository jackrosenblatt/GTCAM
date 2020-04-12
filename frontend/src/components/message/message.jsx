import React from 'react';
import { Link } from "react-router-dom";

const Message = () => {

    return(
        <div>
            <h1>Message your doctor or pharmacy!</h1>
            <p></p>
            <Link to="/DashBoard">Dash Board</Link>
        </div>
    );

}

export default Message;