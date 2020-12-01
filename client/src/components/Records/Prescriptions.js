import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext.js";
import { Icon } from "@iconify/react";
import prescriptionBottleAlt from "@iconify/icons-fa-solid/prescription-bottle-alt";

import "./styles/prescriptions.css";

export default function Prescriptions() {
	const userInfo = useContext(UserContext).userInfo;
	const setUserInfo = useContext(UserContext).setUserInfo;

	const generatePrescriptions = () => {
		if (userInfo.prescriptions) {
			const prescriptions = userInfo.prescriptions.map((prescription, i) => {
				const presColorAsString = () => {
					if (prescription.prescriptionRemaining >= prescription.prescription / 2) {
						return "#17A744";
					} else if (
						prescription.prescriptionRemaining <= prescription.prescription / 2 &&
						prescription.prescriptionRemaining > 0
					) {
						return "#FE7C00";
					} else {
						return "#CE494A";
					}
				};

				return (
					<div key={`prescription-${i}`} className="prescription">
						<div className="prescription-header">
							<p className="prescription-title">{prescription.title}</p>
							<p className="prescription-dosage">{`${prescription.dosage} / ${prescription.form}`}</p>
							<p className="prescription-doctor">{`Perscribed by: ${prescription.doctor}`}</p>
						</div>
						<div className="prescription-pre-body">
							<p className="prescription-remaining">
								Remaining:{" "}
								<span className="txt-bold">
									{prescription.prescriptionRemaining} of {prescription.prescription}
								</span>
							</p>
							<Icon
								className="prescription-remaining-icon"
								icon={prescriptionBottleAlt}
								style={{ color: presColorAsString(), fontSize: "40px" }}
							/>
						</div>
						<div className="prescription-body">
							<p className="prescription-description">{prescription.description}</p>
						</div>
						{prescription.notes ? <p className="prescription-notes">{prescription.notes}</p> : null}
						<div className="prescription-footer">
							<a className="prescription-link fs-medium" href={prescription.info} target="_blank">
								Read more about this medication
							</a>
						</div>
					</div>
				);
			});
			return prescriptions;
		}

		return null;
	};

	return (
		<section className="prescriptions child-container-style">
			<p className="align-mid text-border-bottom container-inner-title txt-bold">Prescriptions</p>
			<div>{generatePrescriptions()}</div>
		</section>
	);
}
