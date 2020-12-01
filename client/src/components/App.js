import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext.js";
import "../styles/app.css";

import CreateUser from "./CreateUser/CreateUser";
import Splash from "./Splash/Splash";
import Login from "./Login/Login";
import Chat from "./Chat/Chat";
import Records from "./Records/Records";
import SchedulePlanner from "./schedulePlanner/SchedulePlanner";
import CreateActivity from "./schedulePlanner/CreateActivity";
import useLocalStorage from "../hooks/useLocalStorage.js";

export const ActivitiesContext = React.createContext();
export const UpdateAtivitiesContext = React.createContext();

function App() {
	const [userInfo, setUserInfo] = useLocalStorage("user");
	const [ActivitiesArray, updateActivitiesArray] = useState([]);

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ userInfo, setUserInfo }}>
				<div className="App">
					<Switch>
						<Route exact path="/">
							{userInfo ? <Redirect to="/home" /> : <Redirect to="/login" />}
						</Route>

						<Route exact path="/chat">
							{userInfo ? <Chat /> : <Redirect to="/login" />}
						</Route>

						<Route exact path="/records">
							{userInfo ? <Records /> : <Redirect to="/login" />}
						</Route>

						<Route exact path="/login">
							{userInfo ? <Redirect to="/home" /> : <Login />}
						</Route>

						<Route exact path="/create-user">
							{<CreateUser />}
						</Route>

						<ActivitiesContext.Provider value={ActivitiesArray}>
							<UpdateAtivitiesContext.Provider value={updateActivitiesArray}>
								<Route exact path="/schedule-planner">
									{userInfo ? <SchedulePlanner /> : <Redirect to="/login" />}
								</Route>

								<Route exact path="/home">
									{userInfo ? <Splash /> : <Redirect to="/login" />}
								</Route>

								<Route exact path="/create-activity">
									<CreateActivity />
								</Route>
							</UpdateAtivitiesContext.Provider>
						</ActivitiesContext.Provider>

						<Route render={() => <h3 className="error-text">404 - HEALTHHUB PAGE NOT FOUND</h3>} />
					</Switch>
				</div>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
