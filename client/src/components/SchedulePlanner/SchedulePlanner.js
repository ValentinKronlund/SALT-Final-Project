import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ActivitiesContext } from "../App"

import Activity from "./Activity";

//export const ActivitiesContext = React.createContext();


export default function SchedulePlanner() {
	const history = useHistory();

	const ActivitiesArray = useContext(ActivitiesContext);

	const [deleted, updateDeleted] = useState(false)


	const goToCreatePage = () => {
		history.push("/create-activity");
	}

	return (
		<>
			{console.log("Schedule Planner ActivitiesArray")}
			{console.log(ActivitiesArray)}


			<div className="activites">
				{ActivitiesArray.map((act) => (
					<Activity
						key={Activity}
						Activity={act.Activity}
						Description={act.Description}
						Time={act.Time}
						deleted={deleted}
						updateDeleted={updateDeleted}
					/>
				))}
			</div>
			<button onClick={goToCreatePage} type="submit">Add an Activity</button>
		</>
	);
}
