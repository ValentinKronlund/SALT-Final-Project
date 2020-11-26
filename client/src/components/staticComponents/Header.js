import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../contexts/Context';

import logo from '../../images/logo-light.png';
import '../../styles/header.css';

const Header = () => {
  const userInfo = useContext(Context).userInfo;
  const setUserInfo = useContext(Context).setUserInfo;

  const logOutUser = () => {
    setUserInfo(undefined);
	};
	
	const printHeaderNavElements = {
		left: () => {
			return (
				<React.Fragment>
      		<Link to="/home" className="header-link header-nav-element header-nav-left">Home</Link>
					<Link to="/schedule-planner" className="header-link header-nav-element header-nav-left">Schedule</Link>
				</React.Fragment>
			);
		},
		right: () => {
			return (
				<React.Fragment>
     		  <Link to="/chat" className="header-link header-nav-element header-nav-right">Chat</Link>
      		<Link to="/login" onClick={logOutUser} className="header-link header-nav-element header-nav-right">Log out</Link>
				</React.Fragment>
			);
		}
	}

  return (
    <header className="header">
			{userInfo ? printHeaderNavElements.left() : null}
      <Link to="/home" className="header-logo">
        <h1 className="header-title">Health Hub</h1>
        <img className="header-icon" src={logo} alt="Health Hub Icon"></img>
      </Link>
			{userInfo ? printHeaderNavElements.right() : null}
    </header>
  );
};

export default Header;
