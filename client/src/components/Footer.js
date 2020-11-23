import React from "react";

import "../styles/footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<p className="created-by">Created by Team Woodchucks</p>
			<div className="author-container">
				<a href="https://github.com/SebastienKronlund" className="author">
					<p className="author-paragraph">Sebastien Kronlund</p>
				</a>
				<a href="https://github.com/Rhodox" className="author">
					<p className="author-paragraph">Alexander Sandberg</p>
				</a>
				<a href="https://github.com/MichaelWearing" className="author">
					<p className="author-paragraph">Michael Wearing</p>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
