import React, { useState, useContext } from "react";
import { ActivitiesContext, UpdateAtivitiesContext } from "../App";
import Context from "../../contexts/UserContext";

import "../../styles/createActivity.css";

export default function CreateActivity({ toggleIsHidden }) {
	const updateActivitiesArray = useContext(UpdateAtivitiesContext);
	const ActivitiesArray = useContext(ActivitiesContext);
	const user = useContext(Context);

	const [Description, updateDescription] = useState("");
	const [Activity, updateActivity] = useState("");
	const [Time, updateTime] = useState("");

	const addActivity = () => {
		const fetchUrl = `http://localhost:1337/api/mongoDB/?firstName=${user.userInfo.firstName}`;
		const newArray = ActivitiesArray;

		const newActivity = {
			Activity: Activity,
			Description: Description,
			Time: Time,
		};

		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ schedule: newArray }),
		};

		newArray.push(newActivity);
		updateActivitiesArray(newArray);

		fetch(fetchUrl, requestOptions);
		toggleIsHidden(false);
	};

	return (
		<>
			<input
				type="text"
				className="input-field"
				name="activity"
				placeholder="Add an activity"
				value={Activity}
				autoComplete="off"
				onChange={(e) => updateActivity(e.currentTarget.value)}
				required
			/>
			<hr className="top-input-underline"></hr>
			<input
				type="text"
				className="input-field"
				name="description"
				placeholder="Add a description"
				value={Description}
				autoComplete="off"
				onChange={(e) => updateDescription(e.currentTarget.value)}
				required
			/>
			<br></br>
			<input
				type="time"
				className="input-field"
				name="time"
				placeholder="Time"
				value={Time}
				onChange={(e) => updateTime(e.currentTarget.value)}
				required
			/>
			<br></br>
			<button className="add-window-button add-act" onClick={addActivity} type="submit">
				<p>Add Activity</p>
			</button>
		</>
	);
}
