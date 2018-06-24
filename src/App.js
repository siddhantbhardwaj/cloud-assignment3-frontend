import React, { Component } from 'react';
import { Config } from './config/index';
import Main from './main.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { students: [] };    
  }

  componentDidMount() {
    fetch(`${Config.baseApi}/students/`).then((response) => {
      this.setState({ students: response.data })
    })
  }
  
  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default App;
