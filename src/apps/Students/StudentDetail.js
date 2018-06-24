import React, { Component } from 'react';
import { Config } from '../../config/index';
import { Link } from 'react-router-dom';

class StudentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: null,
      images: [] 
    }
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({ studentId: params.id });
    fetch(`${Config.baseApi}/students/${params.id}/images`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ images: responseJson.images || this.state.images })
    })
  }
  
  render() {
    const images = this.state.images;
    const images_html = images.map((image) =>
      <div className="col-4" key={image.id}>
        <img className="img-fluid img-thumbnail" src={image}/>
      </div>
    );
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col col-xs-12">
            <div className="text-right">
              <Link className="btn btn-primary" to={`/students/${this.state.studentId}/new_image`} >
                Create a new image
              </Link>
            </div>
            <div className="row mt-2">
              { images.length > 0 &&
                images_html
              }
              { images.length == 0 &&
                <h2 className="text-center w-100">No Images. Please upload!</h2>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default StudentDetail;
