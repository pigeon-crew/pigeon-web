/** @format */

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from '../components/routes/PrivateRoute';
import PublicRoute from '../components/routes/PublicRoute';
// auth + landing imports
import Landing from './Landing';
import Signup from './authflow/Signup';
import Login from './authflow/Login';
// dashboard imports
import Profile from './dashboard/Profile';
import Feed from './dashboard/Feed';
import AccountSettings from './dashboard/AccountSettings';
import FriendsList from './dashboard/FriendsList';
import Chatbot from './dashboard/Chatbot';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path='/' component={Landing} />
        <PublicRoute exact path='/login' component={Login} />
        <PublicRoute exact path='/signup' component={Signup} />
        <PrivateRoute exact path='/feed' component={Feed} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/chatbot' component={Chatbot} />
        <PrivateRoute exact path='/account' component={AccountSettings} />
        <PrivateRoute exact path='/friends' component={FriendsList} />
        <PublicRoute exact={false} path='/' component={Landing} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
