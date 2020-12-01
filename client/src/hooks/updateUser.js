import axios from "axios";

export default async function updateUser() {
	const localUser = JSON.parse(localStorage.getItem("Health-Hub-user"));
	let gotHim;
	if (localUser != null) {
		gotHim = await axios
			.get("http://localhost:1337/api/mongoDB")
			.then((res) => res.data)
			.then((data) => {
				const fetchedUser = data.filter((user) => user.id === localUser.id)[0];
				return fetchedUser;
			})
			.catch((err) => {
				console.log("Error while logging in: ", err.message);
			});
	}

	return gotHim;
}
