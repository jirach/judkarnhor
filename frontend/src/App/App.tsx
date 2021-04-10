import React from 'react';
import {
  BrowserRouter as Router, Link, Switch,
} from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import AppLayout from './Layouts/AppLayout/AppLayout';
import AppRoute from './Layouts/AppRoute';
import LoginLayout from './Layouts/LoginLayout/LoginLayout';

const App: React.FC = () => (
  <div>
    <Router>

      <Link to="/">Home</Link>
      {' '}
      <Link to="/login">Login</Link>
      {' '}
      <Link to="/dashboard">Dashboard</Link>

      <Switch>
        <AppRoute exact path="/" layout={AppLayout} component={Home} />
        <AppRoute exact path="/login" layout={LoginLayout} component={Login} />
        <AppRoute exact path="/dashboard" layout={AppLayout} component={Dashboard} />
      </Switch>
    </Router>
  </div>
);

export default App;
