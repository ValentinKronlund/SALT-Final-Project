import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext.js";
import { Icon } from "@iconify/react";
import prescriptionBottleAlt from "@iconify/icons-fa-solid/prescription-bottle-alt";

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
							<p className="prescription-severity">{`${prescription.dosage} / ${prescription.form}`}</p>
							<p className="prescription-doctor">{`Perscribed by: ${prescription.doctor}`}</p>
						</div>
						<p className="prescription-remaining">{`Remaining prescription: ${prescription.prescriptionRemaining} of ${prescription.prescription}`}</p>
						<Icon
							icon={prescriptionBottleAlt}
							style={{ color: presColorAsString(), fontSize: "40px" }}
						/>
						<p className="prescription-description">{prescription.description}</p>
						{prescription.notes ? <p className="prescription-notes">{prescription.notes}</p> : null}
						<a className="prescription-link" href={prescription.info} target="_blank">
							Read more about this prescription
						</a>
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
