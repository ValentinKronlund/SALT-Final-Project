const { query } = require("express");
const express = require("express");
const router = express.Router();
const mongo = require("./mongo");
const queries = require("./queries");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');

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

	let senderArr = await queries.getUser(rawData, req.body.from);
	let sender = senderArr[0];

	let recipientArr = await queries.getUser(rawData, req.body.to);
	let recipient = recipientArr[0];

	if (recipient == null) {
		console.log("No user with that username exists");
		res.send("ERROR: No user with that username exists").status(400).end();
	} else {
		console.log(`
			FROMID: ${sender.id}
			FROM: ${sender.username}.
			TO: ${recipient.username}
			MESSAGE: ${req.body.messageObj.message}

		`);
	}

	// IF conversation with recipient does not exist, create.
	const generateConvo = async () => {
		if (!sender.messages[recipient.id] || !recipient.messages[sender.id]) {
			const newConversationS = {
				...sender.messages,
				[recipient.id]: {
					username: recipient.username,
					firstName: recipient.firstName,
					lastName: recipient.lastName,
					messages: [],
				},
			};

			const newConversationR = {
				...recipient.messages,
				[sender.id]: {
					username: sender.username,
					firstName: sender.firstName,
					lastName: sender.lastName,
					messages: [],
				},
			};

			await rawData.updateOne({ id: sender.id }, { $set: { messages: newConversationS } });
			await rawData.updateOne({ id: recipient.id }, { $set: { messages: newConversationR } });

			senderArr = await queries.getUser(rawData, req.body.from);
			sender = senderArr[0];
			recipientArr = await queries.getUser(rawData, req.body.to);
			recipient = recipientArr[0];
		}
		return;
	};
	await generateConvo();

	const newMessageForSender = {
		...sender.messages,
		[recipient.id]: {
			...sender.messages[recipient.id],
			messages: [
				...sender.messages[recipient.id].messages,
				{
					timestamp: req.body.messageObj.timestamp,
					fromId: sender.id,
					from: sender.username,
					toId: recipient.id,
					to: recipient.username,
					message: req.body.messageObj.message,
				},
			],
		},
	};

	const newMessageForRecipient = {
		...recipient.messages,
		[sender.id]: {
			...recipient.messages[sender.id],
			messages: [
				...recipient.messages[sender.id].messages,
				{
					timestamp: req.body.messageObj.timestamp,
					fromId: sender.id,
					from: sender.username,
					toId: recipient.id,
					to: recipient.username,
					message: req.body.messageObj.message,
				},
			],
		},
	};

	const updateSender = await rawData.updateOne(
		{ id: sender.id },
		{ $set: { messages: newMessageForSender } }
	);

	const updateRecipient = await rawData.updateOne(
		{ id: recipient.id },
		{ $set: { messages: newMessageForRecipient } }
	);

	const updates = [updateSender, updateRecipient];

	res.json(updates).status(200).end();
});

router.post("/", async (req, res) => {

	const hashedPassword = await bcrypt.hash(req.body.password, 10);


	const rawData = await mongo.db();
	let data;

	const person = {
		"id": uuidv4(),
		"username": req.body.username,
		"password": hashedPassword,
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
		"messages": {},
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

router.post('/userLogin', async (req, res) => {
	const rawData = await mongo.db();
	let user = await queries.getPerson(rawData, req.query.firstName);

	try {
		if (await bcrypt.compare(req.body.password, user[0].password)) {
			res.status(205).send("Success in routes")
		} else {
			res.status(500).send("Not allowed in routes")
		}
	} catch {
		res.status(500).send("Oh no in routes")
	}
})

router.delete("/", async (req, res) => {
	const collection = await mongo.db();
	try {
		collection.deleteOne({ "id": req.query.id });
	} catch (e) {
		res.json(`ERROR: ${e}`).status(500).end();
	}

	res.json("Items have been deleted").status(204).end();
});

module.exports = router;
