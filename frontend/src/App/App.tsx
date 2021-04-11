import React, { useContext } from 'react';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import AppLayout from './Layouts/AppLayout/AppLayout';
import AppRoute from './Layouts/AppRoute';
import LoginLayout from './Layouts/LoginLayout/LoginLayout';
import { firebaseAuth } from '../Providers/AuthProvider';
import SignUp from '../Components/SingUp';
import SignIn from '../Components/SignIn';

const App: React.FC = () => {
  const { handleSignup } = useContext(firebaseAuth);
  console.log(handleSignup);

  return (
    <Router>
      <Switch>
        <AppRoute exact path="/" layout={AppLayout} component={Home} />
        <AppRoute exact path="/login" layout={LoginLayout} component={Login} />
        <AppRoute exact path="/signup" layout={LoginLayout} component={SignUp} />
        <AppRoute exact path="/signin" layout={LoginLayout} component={SignIn} />
        <AppRoute exact path="/dashboard" layout={AppLayout} component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
