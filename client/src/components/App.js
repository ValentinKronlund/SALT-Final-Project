import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Context from "../contexts/Context.js";
/* import ActivityContext from "../contexts/ACtivityContext.js";*/
import "../styles/app.css";

import Header from "./Header";
import Background from "./Background";
import Footer from "./Footer";
import Login from "./Login";
import CreateUser from "./CreateUser";

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
							{userInfo ? (
								<>
									<Header />
									<Background />
									<Footer />
								</>
							) : (
								<Redirect to="/login" />
							)}
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
