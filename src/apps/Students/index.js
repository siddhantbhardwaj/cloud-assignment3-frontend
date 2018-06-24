import React, { Component } from 'react';
import { Config } from '../../config/index';
import { Link } from 'react-router-dom';

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [] }
  }

  componentDidMount() {
    fetch(`${Config.baseApi}/students/`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ students: responseJson })
      })
  }
  
  render() {
    const students = this.state.students.map((student) =>
      <li className="list-group-item" key={student.id}>
        { student.nickname }
        <Link className='float-right' to={`/students/${student.student_id}`}>Show</Link>
      </li>
    );
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col col-xs-12">
            <div className="text-right">
              <Link className="btn btn-primary" to="/students/new">Create a new student</Link>
            </div>
            <ul className="list-group mt-2">
              { students }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Students;
