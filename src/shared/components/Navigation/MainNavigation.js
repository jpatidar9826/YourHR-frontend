import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';

import './MainNavigation.css';

import { AuthContext } from '../../context/auth-context';

const MainNavigation = props => {
  const auth = useContext(AuthContext);

  function logoutHandler() {
    auth.logout();
  }

  return (
    <React.Fragment>
      <MainHeader>
        <div className="navbar-container">
        
        <div className="main-navigation__title">
          <Link to="/"><h1>YourHR</h1></Link>
        </div>
        
        <div className="button-container">
        {!auth.isLoggedIn ? (
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <button className="logout-button">Login</button>
              </Link>
            ) : (
              <button className="logout-button" onClick={logoutHandler}>
                Logout
              </button>
            )}
        </div>
        
        </div>
        
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
