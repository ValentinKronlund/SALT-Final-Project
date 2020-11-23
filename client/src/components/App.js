import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Context from "../contexts/Context.js";
import "../styles/app.css";

import Login from "./Login";

function App() {
	const [userInfo, setUserInfo] = useState({});

	return (
		<BrowserRouter>
			<Context.Provider value={{ userInfo, setUserInfo }}>
				<div className="App">
					<Login />
				</div>
			</Context.Provider>
		</BrowserRouter>
	);
}

export default App;
