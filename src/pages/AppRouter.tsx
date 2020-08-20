/** @format */

import React from 'react';
import Main from './Main';
import Signup from './Signup';
import AddFriends from './onboarding/AddFriends';
import Links from './Links';
import AccountSettings from './AccountSettings';
import FriendsList from './FriendsList';
import Login from './Login';
import PublicRoute from '../components/routes/PublicRoute';
import PrivateRoute from '../components/routes/PrivateRoute';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Main} />
        <PublicRoute exact path="/signup" component={Signup} />
        <PublicRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/onboarding" component={AddFriends} />
        <PrivateRoute exact path="/links" component={Links} />
        <PrivateRoute exact path="/account" component={AccountSettings} />
        <PrivateRoute exact path="/friends" component={FriendsList} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
