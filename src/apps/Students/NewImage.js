import React, { Component } from 'react';
import { Config } from '../../config/index';

class NewImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: '',
      picture_code: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({ student_id: params.id });
    
    document.getElementById("upload_widget_opener").addEventListener("click", () => {
      window.cloudinary.openUploadWidget({
        cloud_name: 'csci5409-sd877278',
        upload_preset: 'rpq7xped',
        tags: ['root'],
        multiple: false
      }, 
      (error, result) => {
        if (!error) {
          this.setState({ picture_code: result[0].public_id + '.' + result[0].format }, () => {
            this.saveImage();
          });
        }
      });
    });
  }
  
  saveImage() {
    fetch(`${Config.baseApi}/students/${this.state.student_id}/upload_image`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        picture_code: this.state.picture_code
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.message) {
        let errors = "";
        Object.keys(responseJson.message).map(function(key, index) {
          errors += `<div key=${key} class='alert alert-danger'>${key} ${responseJson.message[key]}</div>`;
        });
        document.getElementById('errors').innerHTML = errors;
      } else {
        this.props.history.push(`/students/${this.state.student_id}`);        
      }
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.saveImage();
  }
  
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="text-center">
              <a href="#" className="btn btn-info" id="upload_widget_opener">Upload image from Cloudinary Widget</a>
            </div>
            <hr className="mt-5 mb-5"/>
            <h3 className="text-center">----- OR -----</h3>
            <form className="form" onSubmit={this.handleSubmit}>
              <label htmlFor=''>Add an image for student {this.state.student_id}</label>
              <div className="form-group">
                <input name="picture_code"
                  type="text"
                  value={this.state.picture_code}
                  onChange={this.handleInputChange}
                  placeholder="code.jpg"
                  className="form-control"
                />
                <small className="form-text text-muted text-left">Please add picture_code.format from cloudinary, For eg: sample.jpg . If the format of the file is not specified, backend will consider it as jpg format</small>
              </div>
              <div id="errors"></div>
              <div className="form-group text-center">
                <input type="submit" value="Save" className="btn btn-primary"/>          
              </div>
            </form>
          </div>
        </div>
        
      </div>
    );
  }

}

export default NewImage;
