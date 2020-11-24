import React, { useState } from "react";

import Activity from "./Activity";

export default function SchedulePlanner({}) {
	const [Activities, updateActivities] = useState([]);

	return (
		<>
			<div className="activites">
				{Activities.map((act) => (
					<Activity time={act.time} />
				))}
			</div>
			<button type="submit">Add an Activity</button>
		</>
	);
}
