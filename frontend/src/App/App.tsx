import React, { useContext, useEffect } from 'react';
import { Router, Switch } from 'react-router-dom';
import firebase from 'firebase';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import AppLayout from './Layouts/AppLayout/AppLayout';
import AppRoute from './Layouts/AppRoute';
import LoginLayout from './Layouts/LoginLayout/LoginLayout';
import Logout from '../Pages/Logout/Logout';
import { FirebaseAuth } from '../Providers/AuthProvider';
import UserService from '../Services/UserServices';
import customHistory from '../Services/BrowserHistory';

const App: React.FC = () => {
  const { user, setUser } = useContext(FirebaseAuth);

  useEffect(() => firebase.auth().onAuthStateChanged((loggedInUser) => {
    if (!user && loggedInUser) {
      setUser(UserService.transformFirebaseUser(loggedInUser));
    }
  }));

  return (
    <Router history={customHistory}>
      <Switch>
        <AppRoute exact path="/" needAuthen={false} layout={AppLayout} component={Home} />
        <AppRoute exact path="/login" needAuthen={false} layout={LoginLayout} component={Login} />
        <AppRoute exact path="/logout" needAuthen={false} layout={LoginLayout} component={Logout} />
        <AppRoute exact path="/dashboard" needAuthen layout={AppLayout} component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
