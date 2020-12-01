import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext.js";

import "./styles/diagnoses.css";

export default function Diagnoses() {
	const userInfo = useContext(UserContext).userInfo;
	const setUserInfo = useContext(UserContext).setUserInfo;

	const generateDiagnoses = () => {
		if (userInfo.diagnoses) {
			const diagnoses = userInfo.diagnoses.map((diagnose, i) => {
				return (
					<div key={`diagnose-${i}`} className="diagnose">
						<div className="diagnose-header">
							<p className="diagnose-title">{diagnose.title}</p>
							<p className="diagnose-severity">{diagnose.severity}</p>
							<p className="diagnose-doctor">{diagnose.doctor}</p>
						</div>
						<div className="diagnose-body">
							<p className="desc">Description:</p>
							<p className="diagnose-description">{diagnose.description}</p>
						</div>
						<div className="diagnose-post-body">
							<p className="desc">Notes:</p>
							<p className="diagnose-notes">{diagnose.notes}</p>
						</div>
						<div className="diagnose-footer">
							<a className="diagnose-link fs-medium" href={diagnose.info} target="_blank">
								Read more about this diagnose
							</a>
						</div>
					</div>
				);
			});
			return diagnoses;
		}

		return null;
	};

	return (
		<section className="diagnoses child-container-style">
			<p className="align-mid text-border-bottom container-inner-title txt-bold">Diagnoses</p>
			<div>{generateDiagnoses()}</div>
		</section>
	);
}
