import React from "react";

export default function Activity() {
	const [Activity, updateActivity] = useState("");
	const [Description, updateDescription] = useState("");
	const [Time, updateTime] = useState("");

	return (
		<div>
			<button type="submit">Add Activity</button>
		</div>
	);
}
("");
