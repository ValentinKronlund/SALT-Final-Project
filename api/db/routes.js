const { query } = require("express");
const express = require("express");
const router = express.Router();
const mongo = require("./mongo");
const queries = require("./queries");

router.get("/", async (req, res) => {
	const rawData = await mongo.db();

	let data;

	try {
		if (req.query.firstName) {
			data = await queries.getPerson(rawData, req.query.firstName);
		} else {
			data = await queries.getAll(rawData);
		}
	} catch (e) {
		res.json(`ERROR: ${e}`).status(500).end();
	}

	if (data.length === 0) {
		res.json("No entries").status(204).end();
	} else {
		res.json(data).status(200).end();
	}

	/*   const rawData = await mongo.db();
  let data;

  if (req.query.productId) { data = await queries.getProductId(rawData, req.query.productId); }
  else if (req.query.group) { data = await queries.getGroupReviews(rawData, req.query.group); }
  else { data = await queries.getAll(rawData); }

  res
  .json(data)
  .status(200)
  .end();
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  
  const rawData = await mongo.db();
  const data = await rawData.findOne({ id });

  res
    .json(data)
    .status(200)
    .end(); */
});

router.put("/", async (req, res) => {
	const rawData = await mongo.db();

	try {
		const person = await queries.getPerson(rawData, req.query.firstName);
	} catch (e) {
		res.json(`ERROR: ${e}`).status(500).end();
	}

	const data = await rawData.updateOne(
		{ firstName: req.query.firstName },
		{
			$set: {
				username: req.body.username || person.username,
				password: req.body.password || person.password,
				firstName: req.body.firstName || person.firstName,
				lastName: req.body.lastName || person.lastName,
				personnummer: req.body.personnummer || person.personnummer,
				phonenumber: req.body.phonenumber || person.phonenumber,
				email: req.body.email || person.email,
				adress: {
					street: req.body.adress.street || person.adress.street,
					city: req.body.adress.city || person.adress.city,
					postalcode: req.body.adress.postalcode || person.adress.postalcode,
				},
				messages: person.messages,
			},
		}
	);

	res.json(data).status(200).end();
});

router.put("/messages", async (req, res) => {
	if (!req.body.recipient || !req.body.message) {
		console.log("PUT to messages was stopped, missing data in request");

		res.json("ERROR: Missing data in request").status(400).end();
	}

	const rawData = await mongo.db();

	const person = await queries.getPerson(rawData, req.body.recipient);

	console.log(
		"\n----Sending message----\n",
		`User: ${req.body.from}\n`,
		`Sent: "${req.body.message}" \n`,
		`To: ${req.body.recipient}\n`
	);

	const from = req.body.from;
	const message = req.body.message;
	const recipient = req.body.recipient;

	const newMessage = {};
	newMessage[sent] = { timestamp: Date.now(), message: req.body.message, read: false };

	/* 	...person,
	messages: {
		...person.messages,
		$$correspondant: {
			sent: {
				timestamp: Date.now(),
				message: req.body.message,
				read: false,
			},
		},
	}, */

	const data = await rawData.updateOne(
		{ firstName: req.body.recipient },
		{
			$set: {},
		}
	);

	res.json(data).status(200).end();
});

router.post("/", async (req, res) => {
	const rawData = await mongo.db();
	let data;

	const person = {
		"username": req.body.username,
		"password": req.body.password,
		"firstName": req.body.firstName,
		"lastName": req.body.lastName,
		"personnummer": req.body.personnummer,
		"phonenumber": req.body.phonenumber,
		"email": req.body.email,
		"adress": {
			"street": req.body.adress.street,
			"city": req.body.adress.city,
			"postalcode": req.body.adress.postalcode,
		},
		"messages": {
			"tester": {
				"sent": [
					{
						"timestamp": Date.now(),
						"message":
							"Stop the vote! Mail-in voting is fraudulent. This is going to be a fraud like you’ve never seen",
						"read": false,
					},
					{
						"timestamp": Date.now(),
						"message": "Despite the constant negative press covfefe",
						"read": true,
					},
				],
				"received": [
					{
						"timestamp": Date.now(),
						"message":
							"Stop the vote! Mail-in voting is fraudulent. This is going to be a fraud like you’ve never seen",
						"read": false,
					},
					{
						"timestamp": Date.now(),
						"message": "Despite the constant negative press covfefe",
						"read": true,
					},
				],
			},
		},
	};
	try {
		data = await rawData.insertOne(person);
	} catch (e) {
		res.json(`ERROR: ${e}`).status(500).end();
	}

	res.json(data).status(200).end();
});

router.delete("/", async (req, res) => {
	const collection = await mongo.db();
	try {
		collection.deleteOne({ "firstName": req.query.name });
	} catch (e) {
		res.json(`ERROR: ${e}`).status(500).end();
	}

	res.json("Items have been deleted").status(204).end();
});

module.exports = router;
