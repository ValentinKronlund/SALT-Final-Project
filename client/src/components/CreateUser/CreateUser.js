import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import Context from "../../contexts/Context";
import "./createUser.css";

import Header from "../static/Header";
import Background from "../static/Background";
import Footer from "../static/Footer";

const CreateUser = () => {
	const [FirstName, updateFirstName] = useState("");
	const [LastName, updateLastName] = useState("");
	const [Username, updateUsername] = useState("");
	const [Password, updatePassword] = useState("");
	const [ConfirmPassword, updateConfirmPassword] = useState("");
	const [Personnummer, updatePersonnummer] = useState("");
	const [Phonenumber, updatePhonenumber] = useState("");
	const [Email, updateEmail] = useState("");
	const [Street, updateStreet] = useState("");
	const [City, updateCity] = useState("");
	const [PostalCode, updatePostalCode] = useState("");
	const [loginErrors, setLoginErrors] = useState("");

	const nameCapitalize = (string) => {
		const fName = string.toLowerCase();
		const formattedText = fName.replace(/^.|(?<=\s).|(?<=\')./g, (x) => x.toUpperCase());
		return formattedText;
	};

	const history = useHistory();

	const goBack = () => {
		history.push("/");
	};

	const createUser = (e) => {
		e.preventDefault();

		if (Password === ConfirmPassword) {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: Username,
					password: Password,
					firstName: nameCapitalize(FirstName),
					lastName: nameCapitalize(LastName),
					personnummer: Personnummer,
					phonenumber: Phonenumber,
					email: Email,
					address: {
						street: nameCapitalize(Street),
						city: nameCapitalize(City),
						postalcode: PostalCode,
					},
				}),
			};
			fetch("http://localhost:1337/api/mongoDB/", requestOptions).then((response) =>
				console.log(response.json().then(history.push("/")))
			);
		} else {
			setLoginErrors("Password does not match with confirmation. Please try again!");
		}
	};

	return (
		<>
			<Header />
			<Background />
			<p className="error">{loginErrors === "" ? "" : loginErrors}</p>
			<form className="new-user-form" onSubmit={(e) => createUser(e)}>
				<fieldset className="fieldset">
					<legend className="fieldset-legend">Personal Information</legend>
					<label for="fname">First name:</label>
					<input
						type="text"
						className="new-user-input"
						name="fname"
						placeholder="John"
						value={FirstName}
						onChange={(e) => updateFirstName(e.currentTarget.value)}
						autoComplete="on"
						required
					/>
					<label for="lname">Last name:</label>
					<input
						type="text"
						className="new-user-input"
						name="lname"
						placeholder="Doe"
						value={LastName}
						onChange={(e) => updateLastName(e.currentTarget.value)}
						autoComplete="none"
						required
					/>
					<label for="uname">Username:</label>
					<input
						type="text"
						className="new-user-input"
						name="uname"
						placeholder="johnDoe"
						value={Username}
						onChange={(e) => updateUsername(e.currentTarget.value)}
						autoComplete="none"
						required
					/>
					<label for="password">Password:</label>
					<input
						type="password"
						className="new-user-input"
						name="password"
						placeholder="••••••••"
						value={Password}
						onChange={(e) => updatePassword(e.currentTarget.value)}
						autoComplete="none"
						required
					/>
					<label for="password-confirm">Confirm password:</label>
					<input
						type="password"
						className="new-user-input"
						name="password-confirm"
						minlength="6"
						placeholder="••••••••"
						value={ConfirmPassword}
						onChange={(e) => updateConfirmPassword(e.currentTarget.value)}
						autoComplete="none"
						required
					/>
					<label for="personNr">Personnummer:</label>
					<input
						type="tel"
						pattern="[0-9]{6}-[0-9]{4}"
						min="10"
						max="12"
						className="new-user-input"
						name="personNr"
						placeholder="yymmdd-xxxx"
						value={Personnummer}
						onChange={(e) => updatePersonnummer(e.currentTarget.value)}
						autoComplete="none"
						required
					/>
					<label for="phone">Phonenumber:</label>
					<input
						type="tel"
						pattern="[0-9]{10}"
						min="10"
						max="10"
						className="new-user-input"
						name="phone"
						placeholder="0701234567"
						value={Phonenumber}
						onChange={(e) => updatePhonenumber(e.currentTarget.value)}
						autoComplete="none"
						required
					/>
					<label for="email">Email:</label>
					<input
						type="email"
						className="new-user-input"
						name="email"
						placeholder="john.doe@example.com"
						value={Email}
						onChange={(e) => updateEmail(e.currentTarget.value)}
						autoComplete="none"
						required
					/>
				</fieldset>
				<fieldset className="fieldset">
					<legend className="fieldset-legend">Address</legend>
					<label for="street">Street name:</label>
					<input
						type="text"
						className="new-user-input"
						name="street"
						placeholder="Lucky Street 23"
						value={Street}
						onChange={(e) => updateStreet(e.currentTarget.value)}
						autoComplete="none"
						required
					/>
					<label for="city">City:</label>
					<input
						type="text"
						className="new-user-input"
						name="city"
						placeholder="Luxemburg"
						value={City}
						onChange={(e) => updateCity(e.currentTarget.value)}
						autoComplete="none"
						required
					/>
					<label for="postalCode">Postal code:</label>
					<input
						type="text"
						min="5"
						max="5"
						className="new-user-input"
						name="postalCode"
						placeholder="13337"
						value={PostalCode}
						onChange={(e) => updatePostalCode(e.currentTarget.value)}
						autoComplete="none"
						required
					/>
				</fieldset>
				<button className="new-user-button" type="submit">
					Create Account
				</button>
				<button className="new-user-button" onClick={goBack}>
					Back
				</button>
			</form>
			<Footer />
		</>
	);
};

export default CreateUser;
