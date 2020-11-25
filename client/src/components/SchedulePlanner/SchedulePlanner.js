import React, { useState } from "react";

import Activity from "./Activity";

export const ActivitiesContext = React.createContext();

export default function SchedulePlanner({}) {
	const [ActivitiesArray, updateActivitiesArray] = useState([]);

	return (
		<>
			<ActivitiesContext.Provider value={ActivitiesArray}>
				<div className="activites">
					{Activities.map((act) => (
						<Activity />
					))}
				</div>
				<button type="submit">Add an Activity</button>
			</ActivitiesContext.Provider>
		</>
	);
}
