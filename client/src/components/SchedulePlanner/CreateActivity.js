import React from "react";

export default function CreateActivity() {
	return (
		<div>
			<Activity Activity={Activity} Description={Description} Time={Time} />
			<form className="new-user-form" onSubmit={(e) => createUser(e)}>
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
				<button type="submit">Add Activity</button>
			</form>
		</div>
	);
}
