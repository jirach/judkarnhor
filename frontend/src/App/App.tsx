import React from 'react';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import AppLayout from './Layouts/AppLayout/AppLayout';
import AppRoute from './Layouts/AppRoute';
import LoginLayout from './Layouts/LoginLayout/LoginLayout';
import Logout from '../Pages/Logout/Logout';
import AuthProvider from '../Providers/AuthProvider';

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <Switch>
        <AppRoute exact path="/" layout={AppLayout} component={Home} />
        <AppRoute exact path="/login" layout={LoginLayout} component={Login} />
        <AppRoute exact path="/logout" layout={LoginLayout} component={Logout} />
        <AppRoute exact path="/dashboard" layout={AppLayout} component={Dashboard} />
      </Switch>
    </AuthProvider>
  </Router>
);

export default App;
