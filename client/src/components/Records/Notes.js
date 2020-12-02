import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext.js";
import "./styles/notes.css";

export default function Notes() {
	const userInfo = useContext(UserContext).userInfo;
	const setUserInfo = useContext(UserContext).setUserInfo;

	const generateNotes = () => {
		if (userInfo.doctorsNotes) {
			const notes = userInfo.doctorsNotes.map((note, i) => {
				return (
					<div key={`note-${i}`} className="note">
						<div className="note-header">
							<p className="note-title">{note.title}</p>
							<p className="note-for">{note.for}</p>
							<p className="note-doctor">{`by: ${note.doctor}`}</p>
							<p className="note-date">{note.date}</p>
						</div>
						<div className="note-body">
							<p className="note-description">{note.description}</p>
						</div>
					</div>
				);
			});
			return notes;
		}

		return null;
	};

	return (
		<section className="doctors-notes child-container-style">
			<p className="align-mid text-border-bottom container-inner-title txt-bold">Doctors Notes</p>
			<div>{generateNotes()}</div>
		</section>
	);
}
