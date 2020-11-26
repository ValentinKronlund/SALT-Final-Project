import React, { useContext, useState } from "react";
import { ActivitiesContext, UpdateAtivitiesContext } from "../App";

//import "../../styles/activity.css";
import "../../styles/schedulePlanner.css";

export default function Activity({ Activity, Description, Time, deleted, updateDeleted }) {
	const ActivitiesArray = useContext(ActivitiesContext);
	const updateActivitiesArray = useContext(UpdateAtivitiesContext);

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
		if (deleted) {
			updateDeleted(false);
		} else {
			updateDeleted(true);
		}
	};

	return (
		<div className="activity">
			<p>{Activity}</p>
			<p>{Description}</p>
			<p>{Time}</p>
			<button onClick={removeActivity}>Delete</button>
			<button>Mark as done</button>
		</div>
	);
}
