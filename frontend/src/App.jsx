import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, 
  Route, 
  Switch,
  Link,
  Redirect
} from 'react-router-dom';

//Links
import Home from './components/home/home';
import Login from './components/login/login';

class App extends Component {
  render() {
    return (
      <>
        <Home/>
      </>
    );
  }
}

export default App;
