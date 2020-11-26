import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../contexts/Context";

import Navbar from "./Navbar";

import logo from "../../images/logo-light.png";
import "../../styles/header.css";

const Header = () => {
	const userInfo = useContext(Context).userInfo;

	return (
		<header className="header">
			<Link to="/home" className="header-link">
				<h1 className="header-title">Health Hub</h1>
				<img className="header-icon" src={logo} alt="Health Hub Icon"></img>
			</Link>
			{userInfo ? <Navbar /> : null}
		</header>
	);
};

export default Header;
