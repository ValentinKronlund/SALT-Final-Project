import React, { useContext, useState } from "react";
import { ActivitiesContext, UpdateAtivitiesContext } from "../App";

import "../../styles/activity.css";

export default function PreviewActivity({ Activity, Description, Time }) {
	const ActivitiesArray = useContext(ActivitiesContext);
	const updateActivitiesArray = useContext(UpdateAtivitiesContext);

	return (
		<div className="activityPreview">
			<p className="activity-header">{Activity}</p>
			<p>{Description}</p>
			<p>{Time}</p>
		</div>
	);
}
