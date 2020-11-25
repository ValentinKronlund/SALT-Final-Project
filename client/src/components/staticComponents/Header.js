import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo-light.png";
import "../../styles/header.css";

const Header = () => {
	return (
		<header className="header">
			<Link to="/home" className="header-link">
				<h1 className="header-title">Health Hub</h1>
				<img className="header-icon" src={logo} alt="Health Hub Icon"></img>
			</Link>
		</header>
	);
};

export default Header;
