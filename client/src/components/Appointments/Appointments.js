import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext.js";
import Background from "../static/Background";
import Header from "../static/Header";
import Footer from "../static/Footer";
import moment from "moment";
import "./appointments.css";

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
						<div className="appointment-header bg-blue">
							<p className="appointment-title">{appointment.title}</p>
							<p className="appointment-date">{`${dateTime[0]} at ${dateTime[1]}`}</p>
							<p className="appointment-hospital">{appointment.hospital}</p>
						</div>
						<div className="appointment-body">
							<p className="appointment-description">{appointment.description}</p>
						</div>
					</div>
				);
			});
			return appointments;
		}

		return null;
	};

	const generateUpcoming = () => {
		if (userInfo.appointments) {
			const appointments = userInfo.appointments.map((appointment, i) => {
				if (appointment.date < moment().format("Do MMM, h:mm")) {
					const dateTime = appointment.date.split(",");
					return (
						<div key={`appointment-${i}`} className="appointment">
							<div className="appointment-header bg-mint">
								<p className="appointment-title">{appointment.title}</p>
								<p className="appointment-date">{`${dateTime[0]} at ${dateTime[1]}`}</p>
								<p className="appointment-hospital">{appointment.hospital}</p>
							</div>
							<div className="appointment-body">
								<p className="appointment-description">{appointment.description}</p>
							</div>
						</div>
					);
				}
			});
			return appointments;
		}

		return null;
	};

	const generatePassed = () => {
		if (userInfo.appointments) {
			const appointments = userInfo.appointments.map((appointment, i) => {
				if (appointment.date < moment().format("Do MMM, h:mm")) {
					const dateTime = appointment.date.split(",");
					return (
						<div key={`appointment-${i}`} className="appointment">
							<div className="appointment-header bg-accent">
								<p className="appointment-title">{appointment.title}</p>
								<p className="appointment-date">{`${dateTime[0]} at ${dateTime[1]}`}</p>
								<p className="appointment-hospital">{appointment.hospital}</p>
							</div>
							<div className="appointment-body">
								<p className="appointment-description">{appointment.description}</p>
							</div>
						</div>
					);
				}
			});
			return appointments;
		}

		return null;
	};

	return (
		<div>
			<Header />
			<Background />

			<main className="appointments-main main-container-style">
				<section className="appointments child-container-style">
					<p className="container-inner-title align-mid text-border-bottom">Appointments</p>
					{generateAppointments()}
				</section>
				<section className="appointments-upcoming child-container-style">
					<p className="container-inner-title align-mid text-border-bottom">
						Upcoming Appointments
					</p>
					{generateUpcoming()}
				</section>
				<section className="appointments-passed child-container-style">
					<p className="container-inner-title align-mid text-border-bottom">Passed Appointments</p>
					{generatePassed()}
				</section>
			</main>

			<Footer />
		</div>
	);
}
