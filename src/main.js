import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Students from './apps/Students';
import StudentDetail from './apps/Students/StudentDetail';
import NewStudent from './apps/Students/NewStudent';
import NewImage from './apps/Students/NewImage';
import { Link } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <main>
        <div className="container mt-2"><h3><Link to="/">Logo</Link></h3></div>
        <Switch>
          <Route exact path='/' component={Students} />
          <Route exact path='/students' component={Students} />
          <Route exact path='/students/new' component={NewStudent} />
          <Route path='/students/:id/new_image' component={NewImage} />
          <Route path='/students/:id' component={StudentDetail} />
        </Switch>
      </main>
    );
  }
}

export default Main;
