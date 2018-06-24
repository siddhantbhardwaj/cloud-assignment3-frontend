import React, { Component } from 'react';
import { Config } from '../../config/index';

class NewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: '',
      nickname: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    fetch(`${Config.baseApi}/students`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.message) {
        let errors = "";
        Object.keys(responseJson.message).map(function(key, index) {
          errors += `<div class='alert alert-danger'>${key} ${responseJson.message[key]}</div>`;
        });
        document.getElementById('errors').innerHTML = errors;
      } else {
        this.props.history.push("/");        
      }
    });
    
  }
  
  render() {
    return (
      <div className="container mt-5">
        <div className="row text-center">
          <div className="col col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input name="student_id"
                  type="text"
                  value={this.state.student_id}
                  onChange={this.handleInputChange}
                  placeholder="Student id"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input name="nickname"
                  type="text"
                  value={this.state.nickname}
                  onChange={this.handleInputChange}
                  placeholder="Nickname"
                  className="form-control"
                />
              </div>
              <div id="errors"></div>
              <div className="form-group">
                <input type="submit" value="Save" className="btn btn-primary"/>          
              </div>
            </form>
          </div>
        </div>
        
      </div>
    );
  }

}

export default NewStudent;
