import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Context from "../contexts/Context.js";
import axios from "axios";

import Header from "./Header";
import Background from "./Background";
import Footer from "./Footer";

import "../styles/login.css";

const Login = () => {
	const setUserInfo = useContext(Context).setUserInfo;

	const [inputUsername, setInputUsername] = useState("");
	const [inputPassword, setInputPassword] = useState("");
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [loginErrors, setLoginErrors] = useState("");
	const history = useHistory();

	const submitLoginForm = (e) => {
		e.preventDefault();
		setLoginErrors("");
		setIsLoggingIn(true);

		axios
			.get("http://localhost:1337/api/mongoDB")
			.then((res) => res.data)
			.then((data) => {
				const fetchedUser = data.filter(
					(user) =>
						user.username.toLowerCase() === inputUsername.toLowerCase() &&
						user.password === inputPassword
				)[0];

				if (fetchedUser) {
					console.log("Login success!");
					setUserInfo(fetchedUser);
					history.push("/home");
				} else {
					throw Error("Invalid username or password!");
				}
			})
			.catch((err) => {
				console.log("Error while logging in: ", err.message);
				setLoginErrors("Invalid username or password!");
			});

		setIsLoggingIn(false);
		setInputUsername("");
		setInputPassword("");
	};

	return (
		<>
			<Header />
			<Background />
			<section className="login-page">
				<h2 className="login-welcome">Welcome, please sign in below</h2>
				<div className="login-container">
					<form className="login-form" onSubmit={(e) => submitLoginForm(e)}>
						<p className="small-text error">{loginErrors === "" ? "" : loginErrors}</p>
						<legend className="login-legend">{isLoggingIn ? "Logging In.." : "Login"}</legend>
						<input
							className="login-input"
							type="text"
							placeholder="Username"
							value={inputUsername}
							onChange={(e) => setInputUsername(e.currentTarget.value)}
							required
						/>
						<input
							className="login-input"
							type="password"
							placeholder="Password"
							value={inputPassword}
							onChange={(e) => setInputPassword(e.currentTarget.value)}
							required
						/>
						<button className="login-button" type="submit" disabled={isLoggingIn}>
							Submit
						</button>
					</form>
					<Link to="/create-user" className="login-alt">
						<p>Or click here if you don’t already have an account</p>
					</Link>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Login;
