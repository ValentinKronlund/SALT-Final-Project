import React, { useState, useContext } from "react";
import { ActivitiesContext } from "../App";
import { UpdateAtivitiesContext } from "../App";
import { useHistory } from "react-router-dom";


export default function CreateActivity() {

	const ActivitiesArray = useContext(ActivitiesContext);
	const updateActivitiesArray = useContext(UpdateAtivitiesContext);
	//const context = useContext(ActivitiesContext);

	const history = useHistory();

	const [Activity, updateActivity] = useState("");
	const [Description, updateDescription] = useState("");
	const [Time, updateTime] = useState("");


	const addActivity = () => {
		const newActivity = {
			Activity: Activity,
			Description: Description,
			Time: Time
		};

		const newArray = ActivitiesArray;
		newArray.push(newActivity);
		updateActivitiesArray(newArray);
		history.push("/schedule-planner");
	}

	return (
		<div>
				<input
					type="text"
					className="new-user-input"
					name="activity"
					placeholder="Activity"
					value={Activity}
					onChange={(e) => updateActivity(e.currentTarget.value)}
					required
				/>
				<input
					type="text"
					className="new-user-input"
					name="description"
					placeholder="Description"
					value={Description}
					onChange={(e) => updateDescription(e.currentTarget.value)}
					required
				/>
				<input
					type="text"
					className="new-user-input"
					name="time"
					placeholder="Time"
					value={Time}
					onChange={(e) => updateTime(e.currentTarget.value)}
					required
				/>
				<button onClick={addActivity} type="submit">Add Activity</button>
		</div>
	);
}
