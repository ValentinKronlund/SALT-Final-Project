import React, { useContext, useState } from "react";
import { ActivitiesContext, UpdateAtivitiesContext } from "../App";
import Context from "../../contexts/UserContext";

//import "../../styles/activity.css";
import "../../styles/schedulePlanner.css";

export default function Activity({ Activity, Description, Time, deleted, updateDeleted }) {
	const ActivitiesArray = useContext(ActivitiesContext);
	const updateActivitiesArray = useContext(UpdateAtivitiesContext);
	const user = useContext(Context);

	const removeActivity = () => {
		const newArray = ActivitiesArray;
		console.log(newArray);
		newArray.map((act) => {
			if (act.Activity === Activity) {
				const index = newArray.indexOf(act);
				newArray.splice(index, 1);
			}
		});
		updateActivitiesArray(newArray);

		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ schedule: newArray }),
		};
		fetch(
			`http://localhost:1337/api/mongoDB/?firstName=${user.userInfo.firstName}`,
			requestOptions
		).then((response) => console.log("---- Response.json() ----\n", response.json()));

		if (deleted) {
			updateDeleted(false);
		} else {
			updateDeleted(true);
		}
	};

	return (
		<div className="activity-container">

			<div className="time-text">
				<p>{Time}</p>
			</div>

			<div className="activity-text">
				<p>{Activity}</p>
			</div>

			<div className="description-text">
				<p>{Description}</p>
			</div>

			<div className="button-container">
			<button className="buttons">Mark as done</button>
			<button className="buttons" onClick={removeActivity}>
				Delete
			</button>
			</div>
		</div>
	);
}
