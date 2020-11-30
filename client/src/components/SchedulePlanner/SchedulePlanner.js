import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../contexts/Context";
import { ActivitiesContext, UpdateAtivitiesContext } from "../App";
import { v4 as uuid } from "uuid";

import Header from "../staticComponents/Header";
import Background from "../staticComponents/Background";
import Footer from "../staticComponents/Footer";

import "../../styles/schedulePlanner.css";

import Activity from "./Activity";

export default function SchedulePlanner() {
	const history = useHistory();

	let ActivitiesArray = useContext(ActivitiesContext);
	const updateActivitiesArray = useContext(UpdateAtivitiesContext);
	const userInfo = useContext(Context).userInfo;

	const [deleted, updateDeleted] = useState(false);

	const goToCreatePage = () => {
		history.push("/create-activity");
	};

	useEffect(() => {
		console.log("I am going to update ActivitiesArray");
		ActivitiesArray = userInfo.schedule;
		updateActivitiesArray(ActivitiesArray);
	}, []);

	const mapActivities = () => {
		if (ActivitiesArray.length === 0) {
			return <p>--Schedule Empty! --</p>;
		} else {
			return ActivitiesArray.map((act) => (
				<Activity
					key={uuid()}
					Activity={act.Activity}
					Description={act.Description}
					Time={act.Time}
					deleted={deleted}
					updateDeleted={updateDeleted}
				/>
			));
		}
	};

	return (
		<>
			<Header />
			<Background />
			<div className="">{mapActivities()}</div>
			<button className="add-activity-button" onClick={goToCreatePage} type="submit">
				Add an Activity
			</button>
			<Footer />
		</>
	);
}
