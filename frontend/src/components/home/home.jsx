import React from 'react';
import Calendar from 'react-calendar';
import Nav from '../nav/nav';
import './home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <>
        <Nav></Nav>
        <div><Calendar id='userCal'></Calendar></div>
        
        </>;
    }
}


export default Home;
