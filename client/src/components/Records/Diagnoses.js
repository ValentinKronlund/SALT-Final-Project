import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext.js";

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
						<p className="diagnose-description">{diagnose.description}</p>
						<p className="diagnose-notes">{diagnose.notes}</p>
						<a className="diagnose-link" href={diagnose.info} target="_blank">
							Read more about this diagnose
						</a>
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
