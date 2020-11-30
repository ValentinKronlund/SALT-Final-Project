import React from "react";
import { Link } from "react-router-dom";

import Context from "../../contexts/Context.js";

import Header from "./Header";
import Background from "./Background";
import Footer from "./Footer";

const CreateUser = () => {
	return (
		<>
			<Header />
			<Background />
			<form className="new-user-form">
				<fieldset>
					<label>Personal Information</label>
					<input type="text" className="new-user-input" name="fname" placeholder="First Name" />
					<input type="text" className="new-user-input" name="lname" placeholder="Last Name" />
					<input type="text" className="new-user-input" name="pass" placeholder="Password" />
					<input
						type="text"
						className="new-user-input"
						name="cpass"
						placeholder="Confirm Password"
					/>
					<input type="text" className="new-user-input" name="prsnnmr" placeholder="Personnummer" />
					<input type="text" className="new-user-input" name="phone" placeholder="Phone Number" />
					<input type="text" className="new-user-input" name="email" placeholder="Email" />
				</fieldset>
				<fieldset>
					<label>Address</label>
					<input type="text" className="new-user-input" name="street" placeholder="Street" />
					<input type="text" className="new-user-input" name="city" placeholder="City" />
					<input type="text" className="new-user-input" name="pcode" placeholder="Postal Code" />
				</fieldset>
				<button type="submit">Create Account</button>
			</form>
			<Footer />
		</>
	);
};

export default CreateUser;
