/** @format */

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from '../components/routes/PrivateRoute';
import PublicRoute from '../components/routes/PublicRoute';
import AccountSettings from './AccountSettings';
import FriendsList from './FriendsList';
import Links from './Links';
import Login from './Login';
import Main from './Main';
import Signup from './Signup';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Main} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/links" component={Links} />
        <PrivateRoute exact path="/account" component={AccountSettings} />
        <PrivateRoute exact path="/friends" component={FriendsList} />
        <PublicRoute exact={false} path="/" component={Main} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
