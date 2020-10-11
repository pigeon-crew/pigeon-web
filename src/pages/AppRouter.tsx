/** @format */

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from '../components/routes/PrivateRoute';
import PublicRoute from '../components/routes/PublicRoute';
import AccountSettings from './dashboard/AccountSettings';
import FriendsList from './dashboard/FriendsList';
import Links from './dashboard/Links';
import Login from './authflow/Login';
import Landing from './Landing';
import Signup from './authflow/Signup';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path='/' component={Landing} />
        <PublicRoute exact path='/login' component={Login} />
        <PublicRoute exact path='/signup' component={Signup} />
        <PrivateRoute exact path='/links' component={Links} />
        <PrivateRoute exact path='/account' component={AccountSettings} />
        <PrivateRoute exact path='/friends' component={FriendsList} />
        <PublicRoute exact={false} path='/' component={Landing} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
