import React, { useContext, useState, useEffect } from "react";
import Context from "../../contexts/UserContext";
import { ActivitiesContext, UpdateAtivitiesContext } from "../App";

import Activity from "./Activity";
import PreviewActivity from "./PreviewActivity";

export default function SchedulePreview() {
	let ActivitiesArray = useContext(ActivitiesContext);
	const updateActivitiesArray = useContext(UpdateAtivitiesContext);
	const userInfo = useContext(Context).userInfo;

	const [deleted, updateDeleted] = useState(false);

	useEffect(() => {
		ActivitiesArray = userInfo.schedule;
		updateActivitiesArray(ActivitiesArray);
	}, []);

	const getFirstActivity = () => {
		if (ActivitiesArray.length === 0) {
			return <p>--Schedule Empty! --</p>;
		} else {
			/* 			const firstActivity = ActivitiesArray[0];
			return (
				<PreviewActivity
					Activity={firstActivity.Activity}
					Description={firstActivity.Description}
					Time={firstActivity.Time}
					deleted={deleted}
					updateDeleted={updateDeleted}
				/>
			); */

			return ActivitiesArray.map((act, i) => (
				<PreviewActivity
					key={i}
					Activity={act.Activity}
					Description={act.Description}
					Time={act.Time}
					deleted={deleted}
					updateDeleted={updateDeleted}
				/>
			));
		}
	};

	return (
		<>
			<div className="schedule splash-content-container">
				<h4 className="align-mid text-border-bottom schedule-title">Schedule</h4>
				<div className="all-schedules">{getFirstActivity()}</div>
			</div>
		</>
	);
}
