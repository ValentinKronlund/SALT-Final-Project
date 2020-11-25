import React from "react";
import "../../styles/background.css";
import backgroundArt from "../../images/background_art.png";

const Background = () => {
	return (
		<div className="background">
			<img src={backgroundArt} className="background-image" alt="Background Art" />
		</div>
	);
};

export default Background;
