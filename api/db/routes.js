const { query } = require("express");
const express = require("express");
const router = express.Router();
const mongo = require("./mongo");
const queries = require("./queries");
const { v4: uuidv4 } = require("uuid");

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
});

router.put("/", async (req, res) => {
	const rawData = await mongo.db();

	let person;
	try {
		person = await queries.getPerson(rawData, req.query.firstName);
	} catch (e) {
		res.json(`ERROR: ${e}`).status(500).end();
	}
	console.log(person, ".......Person.......");

	const data = await rawData.updateOne(
		{ firstName: req.query.firstName },
		{
			$set: {
				username: req.body.username || person[0].username,
				password: req.body.password || person[0].password,
				firstName: req.body.firstName || person[0].firstName,
				lastName: req.body.lastName || person[0].lastName,
				personnummer: req.body.personnummer || person[0].personnummer,
				phonenumber: req.body.phonenumber || person[0].phonenumber,
				email: req.body.email || person[0].email,
				address: {
					street: req.body.street || person[0].address.street,
					city: req.body.city || person[0].address.city,
					postalcode: req.body.postalcode || person[0].address.postalcode,
				},
				//messages: person.messages || person.address.messages,
				schedule: req.body.schedule || person[0].schedule,
			},
		}
	);

	res.json(data).status(200).end();
});

router.put("/messages", async (req, res) => {
	if (!req.body) {
		console.log("PUT to messages was stopped, missing data in request");
		res.json("ERROR: Missing data in request").status(400).end();
	} else if (req.body.from === req.body.to) {
		console.log("You cannot send messages to yourself!");
		res.json("ERROR: Cannot send message to yourself").status(400).end();
	}

	const rawData = await mongo.db();

	const sender = await queries.getUser(rawData, req.body.from);
	const senderName = sender[0].username;

	const recipient = await queries.getUser(rawData, req.body.to);
	const recipientName = recipient[0].username;

	// console.log(req.body, "<--- req.body");

	// console.log(sender, "<--- Sender");
	// console.log(recipient, "<--- Recipient");
	// console.log(recipientName, "<-- rec name");

	console.log(`
		FROM: ${senderName}.
		TO: ${recipientName}
		MESSAGE: ${req.body.messageObj.message}
	
	`);

	console.log(sender[0].messages[recipientName], "<-- sender - correspondance");
	if (!sender[0].messages[recipientName]) {
		const generateCorrespondance = {
			...sender[0].messages,
			[recipientName]: {
				sent: [],
				received: [],
			},
		};

		await rawData.updateOne(
			{ username: senderName },
			{ $set: { messages: generateCorrespondance } }
		);
	}

	const senderNewMessages = {
		...sender[0].messages,
		[recipientName]: {
			sent: [
				{
					timestamp: req.body.messageObj.timestamp,
					message: req.body.messageObj.message,
					read: false,
				},
				...(sender[0].messages[recipientName].sent === undefined
					? []
					: sender[0].messages[recipientName].sent),
			],
			received: [
				...(sender[0].messages[recipientName].received === undefined
					? []
					: sender[0].messages[recipientName].received),
			],
		},
	};

	console.log(recipient[0].messages[senderName], "<-- recipient - correspondance");
	if (!recipient[0].messages[senderName]) {
		const generateCorrespondance = {
			...recipient[0].messages,
			[senderName]: {
				sent: [],
				received: [],
			},
		};

		await rawData.updateOne(
			{ username: recipientName },
			{ $set: { messages: generateCorrespondance } }
		);
	}

	const recipientNewMessages = {
		...recipient[0].messages,
		[senderName]: {
			sent: [
				...(recipient[0].messages[senderName].sent === undefined
					? []
					: recipient[0].messages[senderName].sent),
			],
			received: [
				{
					timestamp: req.body.messageObj.timestamp,
					message: req.body.messageObj.message,
					read: false,
				},
				...(recipient[0].messages[senderName].received === undefined
					? []
					: recipient[0].messages[senderName].received),
			],
		},
	};
	// console.log(recipientNewMessages, "<-- recipientNewMessages");

	const updateSender = await rawData.updateOne(
		{ username: senderName },
		{ $set: { messages: senderNewMessages } }
	);

	const updateRecipient = await rawData.updateOne(
		{ username: recipientName },
		{ $set: { messages: recipientNewMessages } }
	);

	const updates = [updateSender, updateRecipient];

	res.json(updates).status(200).end();
});

router.post("/", async (req, res) => {
	const rawData = await mongo.db();
	let data;

	const person = {
		"id": uuidv4(),
		"username": req.body.username,
		"password": req.body.password,
		"firstName": req.body.firstName,
		"lastName": req.body.lastName,
		"personnummer": req.body.personnummer,
		"phonenumber": req.body.phonenumber,
		"email": req.body.email,
		"address": {
			"street": req.body.address.street,
			"city": req.body.address.city,
			"postalcode": req.body.address.postalcode,
		},
		"messages": {
			"Tronald": {
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
							"Twitter is sending out totally false “Trends” that have absolutely nothing to do with what is really trending in the world. They make it up, and only negative “stuff”. Same thing will happen to Twitter as is happening to @FoxNews daytime. Also, big Conservative discrimination!",
						"read": false,
					},
					{
						"timestamp": Date.now(),
						"message":
							"A total FRAUD. Statehouse Republicans, proud, strong and honest, will never let this travesty stand!",
						"read": true,
					},
				],
			},
		},
		"schedule": [
			{
				Activity: "Walk Doggo",
				Description: "He needs a walk",
				Time: "14:00",
			},
		],
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
