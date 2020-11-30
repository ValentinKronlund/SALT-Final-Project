import React, { useState, useContext } from "react";
import { ActivitiesContext, UpdateAtivitiesContext } from "../App";
import Context from "../../contexts/Context";
import { useHistory } from "react-router-dom";

import Header from "../static/Header";
import Background from "../static/Background";
import Footer from "../static/Footer";

import "../../styles/createActivity.css";

export default function CreateActivity() {
	const ActivitiesArray = useContext(ActivitiesContext);
	const updateActivitiesArray = useContext(UpdateAtivitiesContext);
	const user = useContext(Context);

	const history = useHistory();

	const [Activity, updateActivity] = useState("");
	const [Description, updateDescription] = useState("");
	const [Time, updateTime] = useState("");

	const goBack = () => {
		history.push("/schedule-planner");
	};

	const addActivity = () => {
		const newActivity = {
			Activity: Activity,
			Description: Description,
			Time: Time,
		};

		console.log("--- ActivitiesArray ---\n", ActivitiesArray);
		const newArray = ActivitiesArray;
		console.log("--- newArray ---\n", newArray);
		console.log("--- This is being pushed onto newArray ---\n", newActivity);
		newArray.push(newActivity);
		console.log("--- newArray after push ---\n", newArray);
		updateActivitiesArray(newArray);
		//	history.push("/schedule-planner");

		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ schedule: newArray }),
		};
		fetch(`http://localhost:1337/api/mongoDB/?firstName=${user.userInfo.firstName}`, requestOptions)
			.then((response) => console.log("---- Response.json() ----\n", response.json()))
			.then(history.push("/schedule-planner"));
	};

	return (
		<>
			<Header />
			<Background />
			<div className="creation-body">
				<input
					type="text"
					className="input-field"
					name="activity"
					placeholder="Activity"
					value={Activity}
					onChange={(e) => updateActivity(e.currentTarget.value)}
					required
				/>
				<input
					type="text"
					className="input-field"
					name="description"
					placeholder="Description"
					value={Description}
					onChange={(e) => updateDescription(e.currentTarget.value)}
					required
				/>
				<input
					type="text"
					className="input-field"
					name="time"
					placeholder="Time"
					value={Time}
					onChange={(e) => updateTime(e.currentTarget.value)}
					required
				/>
				<button className="" onClick={addActivity} type="submit">
					Add Activity
				</button>
				<button className="add-activity-back" onClick={goBack} type="submit">
					Back
				</button>
			</div>
			<Footer />
		</>
	);
}
