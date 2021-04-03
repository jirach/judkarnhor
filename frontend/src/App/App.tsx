import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard/Dashboard';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';

const App: React.FC = () => (
  <div>
    
    <Router>
    <Link to="/">Home</Link> <Link to="/login">Login</Link> <Link to="/dashboard">Dashboard</Link>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </Router>
  </div>
)

export default App;
