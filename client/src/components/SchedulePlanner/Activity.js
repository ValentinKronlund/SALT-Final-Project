import React, { useContext, useState } from "react";
import { ActivitiesContext, UpdateAtivitiesContext } from "../App";
import Context from "../../contexts/UserContext";

//import "../../styles/activity.css";
import "../../styles/schedulePlanner.css";

export default function Activity({ Activity, Description, Time, userDate, deleted, updateDeleted }) {
	const ActivitiesArray = useContext(ActivitiesContext);
	const updateActivitiesArray = useContext(UpdateAtivitiesContext);
	const user = useContext(Context);

	const [isDone, setIsDone] = useState(false);

	const formatDate = () => {
		let d = new Date(userDate);
		const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
		const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
		const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
		const formattedDate = `${da}-${mo}-${ye}`;
		
		return (<p>{formattedDate}</p>);
	}

	const changeState = () => {
		setIsDone(!isDone)
	};

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
		<div className={"activity-label" + (isDone ? " done" : "")}>
			<div className="activity-date">{userDate ? formatDate() : null}</div>
			<div className="activity">
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
				<button className="buttons" onClick={changeState}>Mark as {isDone ? "un-done" : "done"}</button>
				<button className="buttons" onClick={removeActivity}>
					Delete
				</button>
				</div>
			</div>
		</div>
	);
}
