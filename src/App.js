import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { useAuth } from './shared/hooks/auth-hook';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Home from './users/pages/Home';
import { AuthContext } from './shared/context/auth-context';
import Auth from './users/pages/Auth';


const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if(token){
    routes=(
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Redirect to="/" />
        </Switch>
    );
  }else{
    routes=(
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
        </Switch>
    );
  }



  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
