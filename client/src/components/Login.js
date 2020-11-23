import React, { useState } from "react";
import { Link } from "react-router-dom";

import Context from "../contexts/Context.js";

import Header from "./Header";
import Background from "./Background";
import Footer from "./Footer";

import "../styles/login.css";

const Login = () => {
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	return (
		<>
			<Header />
			<Background />
			<section className="login-page">
				<h2 className="login-welcome">Welcome, please sign in below</h2>
				<div className="login-container">
					<form className="login-form">
						<legend className="login-legend">{isLoggingIn ? "Logging In.." : "Login"}</legend>
						<input className="login-input" type="text" placeholder="Username" required />
						<input className="login-input" type="password" placeholder="Password" required />
						<button className="login-button" type="submit" disabled={isLoggingIn}>
							Submit
						</button>
					</form>
					<Link to="/create-account" className="login-alt">
						<p>Or click here if you don’t already have an account</p>
					</Link>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Login;
