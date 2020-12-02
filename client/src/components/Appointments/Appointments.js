import React from 'react'

import Background from "../static/Background";
import Header from "../static/Header";
import Footer from "../static/Footer";

import "./appointments.css";

export default function Appointments() {
    return (
        <div>
            <Header />
            <Background />

            <div className="appointments splash-content-container">
                <h4 className="container-inner-title align-mid text-border-bottom">Appointments</h4>
                <div className="appointments-entries-area">
                    <div className="appointment">
                        <p className="appointment-title">Quarterly check-up | St. Adams Hospital</p>
                        <p className="appointment-date">15:th of August at 14:30</p>
                        <p className="appointment-description">
                            this is really just filler text, nothing to see here folks, go on about your daily
                            struggle come on now stop reading i mean it stop please.
								</p>
                    </div>
                    <div className="appointment">
                        <p className="appointment-title">Bloodtest results | St. Adams Hospital</p>
                        <p className="appointment-date">21:th of January at 14:30</p>
                        <p className="appointment-description">
                            this is really just filler text, nothing to see here folks, go on about your daily
                            struggle come on now stop reading i mean it stop please.
								</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
