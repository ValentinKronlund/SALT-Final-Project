import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext.js";
import Background from "../static/Background";
import Header from "../static/Header";
import Footer from "../static/Footer";
import "./appointments.css";

export default function Appointments() {
	const userInfo = useContext(UserContext).userInfo;
	const setUserInfo = useContext(UserContext).setUserInfo;

	const generateAppointments = () => {
		if (userInfo.appointments) {
			const appointments = userInfo.appointments.map((appointment, i) => {
				const dateTime = appointment.date.split(",");
				return (
					<div key={`appointment-${i}`} className="appointment">
						<p className="appointment-title">{`${appointment.title} | ${appointment.hospital}`}</p>
						<p className="appointment-date">{`${dateTime[0]} at ${dateTime[1]}`}</p>
						<p className="appointment-description">{appointment.description}</p>
					</div>
				);
			});
			return appointments;
		}

		return null;
	};

	return (
		<div>
			<Header />
			<Background />

			<main className="appointments main-container-style">
				<section className="appointments child-container-style">
					<p className="container-inner-title align-mid text-border-bottom">Appointments</p>
					{generateAppointments()}
				</section>
			</main>

			<Footer />
		</div>
	);
}
