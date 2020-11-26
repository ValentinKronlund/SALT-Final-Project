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

	const senderNewMessages = {
		...sender[0].messages,
		[recipientName]: {
			sent: [
				{
					timestamp: req.body.messageObj.timestamp,
					message: req.body.messageObj.message,
					read: false,
				},
				...(sender[0].messages === undefined ? [] : sender[0].messages[recipientName].sent),
			],
			received: [
				...(sender[0].messages === undefined ? [] : sender[0].messages[recipientName].received),
			],
		},
	};

	// console.log(senderNewMessages);

	const recipientNewMessages = {
		...recipient[0].messages,
		[senderName]: {
			sent: [
				...(recipient[0].messages === undefined ? [] : recipient[0].messages[senderName].sent),
			],
			received: [
				{
					timestamp: req.body.messageObj.timestamp,
					message: req.body.messageObj.message,
					read: false,
				},
				...(recipient[0].messages === undefined ? [] : recipient[0].messages[senderName].received),
			],
		},
	};

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
		"schedule": [
			{
				Activity: "Eat",
				Description: "Yummy",
				Time: "Now",
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
