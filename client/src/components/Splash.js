import React, { useContext } from "react";
import "../styles/splash.css";
import Context from "../contexts/Context.js";

import Header from "./staticComponents/Header";
import Background from "./staticComponents/Background";
import Footer from "./staticComponents/Footer";

const Splash = () => {
	const userInfo = useContext(Context).userInfo;

	return (
		<>
			<Header />
			<Background />
			<section className="splash-page">
				<h2 className="splash-greeting">
					Hello {userInfo.firstName} {userInfo.lastName}
				</h2>
				<div className="splash-content-area">
					<div className="inbox splash-content-container"></div>
					<div className="appointments splash-content-container"></div>
					<div className="recommendations splash-content-container"></div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Splash;
