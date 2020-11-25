import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Context from "../contexts/Context.js";
import "../styles/app.css";

import Background from "./staticComponents/Background";
import Header from "./staticComponents/Header";
import Footer from "./staticComponents/Footer";

import CreateUser from "./CreateUser";
import Splash from "./Splash";
import Login from "./Login";
import Chat from "./Chat";

function App() {
	const [userInfo, setUserInfo] = useState();

	return (
		<BrowserRouter>
			<Context.Provider value={{ userInfo, setUserInfo }}>
				<div className="App">
					<Switch>
						<Route exact path="/">
							{userInfo ? <Redirect to="/home" /> : <Redirect to="/login" />}
						</Route>

						<Route exact path="/home">
							{userInfo ? <Splash /> : <Redirect to="/login" />}
						</Route>

						<Route exact path="/home/chat">
							{/* {userInfo ? */} <Chat /> {/* : <Redirect to="/login" />} */}
						</Route>

						<Route exact path="/login">
							<Login />
						</Route>

						<Route exact path="/create-user">
							{<CreateUser />}
						</Route>

						<Route render={() => <h3 className="error-text">404 - HEALTHHUB PAGE NOT FOUND</h3>} />
					</Switch>
				</div>
			</Context.Provider>
		</BrowserRouter>
	);
}

export default App;
