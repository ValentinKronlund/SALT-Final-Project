//This component is now outdated and included in the header
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/navbar.css';

import Context from '../../contexts/Context';

const Navbar = () => {
  const setUserInfo = useContext(Context).setUserInfo;

  const logOutUser = () => {
    setUserInfo(undefined);
  };

  return (
    <div className="navbar">
      <div className="navbar-link-container">
        <Link to="/login" onClick={logOutUser}>
          <li className="navbar-link">Log out</li>
        </Link>
        <Link to="/chat">
          <li className="navbar-link">Chat</li>
        </Link>
        <Link to="/schedule-planner">
          <li className="navbar-link">Schedule</li>
        </Link>
        <Link to="/home">
          <li className="navbar-link">Home</li>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
