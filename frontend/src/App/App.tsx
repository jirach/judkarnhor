import React, { useContext, useEffect, useState } from 'react';
import { Router, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Login from '../Pages/Login/Login';
import AppLayout from './Layouts/AppLayout/AppLayout';
import AppRoute from './Layouts/AppRoute';
import LoginLayout from './Layouts/LoginLayout/LoginLayout';
import Logout from '../Pages/Logout/Logout';
import { AppContext } from '../Providers/AppProvider';
import UserService from '../Services/UserServices';
import customHistory from '../Services/BrowserHistory';
import Building from '../Pages/Building/Building';
import Report from '../Pages/Report/Report';

const App: React.FC = () => {
  const { user, setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  // Get Signed in user
  useEffect(() => firebase.auth().onAuthStateChanged((loggedInUser) => {
    if (!user && loggedInUser) {
      setUser(UserService.transformFirebaseUser(loggedInUser));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }), [user]);

  // Show loading page
  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Router history={customHistory}>
      <Switch>
        <AppRoute exact path="/" needAuthen={false} layout={AppLayout} component={Dashboard} />
        <AppRoute exact path="/dashboard" needAuthen layout={AppLayout} component={Dashboard} />
        <AppRoute exact path="/building" needAuthen layout={AppLayout} component={Building} />
        <AppRoute exact path="/report" needAuthen layout={AppLayout} component={Report} />

        <AppRoute exact path="/login" needAuthen={false} layout={LoginLayout} component={Login} />
        <AppRoute exact path="/logout" needAuthen={false} layout={LoginLayout} component={Logout} />

      </Switch>
    </Router>
  );
};

export default App;
