import React, { useContext } from "react";
import Background from "../static/Background";
import Header from "../static/Header";
import Footer from "../static/Footer";
import Diagnoses from "./Diagnoses";
import Prescriptions from "./Prescriptions";
import Notes from "./Notes";
import UserContext from "../../contexts/UserContext.js";

import "./records.css";

export default function Records() {
	const userInfo = useContext(UserContext).userInfo;
	const setUserInfo = useContext(UserContext).setUserInfo;

	return (
		<>
			<Header />
			<Background />
			<main className="records-container main-container-style d-grid-three-colums">
				<Diagnoses />
				<Prescriptions />
				<Notes />
			</main>
			<Footer />
		</>
	);
}
