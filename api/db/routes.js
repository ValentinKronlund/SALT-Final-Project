const { query } = require("express");
const express = require("express");
const router = express.Router();
const mongo = require("./mongo");
const queries = require("./queries");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const moment = require("moment");

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
		"diagnoses": [
			{
				"title": "Crohn's Disease",
				"severity": "Mild",
				"description":
					"Crohn's disease is a type of inflammatory bowel disease (IBD). It causes inflammation of your digestive tract, which can lead to abdominal pain, severe diarrhea, fatigue, weight loss and malnutrition.",
				"notes":
					"Patient shows symptoms of Crohn's Disease, this can be confirmed after colonoscopy performed on patients last visit. Symptoms are currently mild but can worsen unless treated. Prescribing Cortiment and Azathioprine.",
				"info":
					"https://www.mayoclinic.org/diseases-conditions/crohns-disease/symptoms-causes/syc-20353304",
				"doctor": "Dr. Feelgood",
			},
			{
				"title": "Migraine",
				"severity": "Chronic",
				"description":
					"A migraine can cause severe throbbing pain or a pulsing sensation, usually on one side of the head. It's often accompanied by nausea, vomiting, and extreme sensitivity to light and sound. Migraine attacks can last for hours to days, and the pain can be so severe that it interferes with your daily activities.",
				"notes":
					"Patient experiences symptoms closely resembling chronic Migraine. Symptoms interfere with patient daily activities. Citodon and Naproxen have been prescribed ",
				"info":
					"https://www.mayoclinic.org/diseases-conditions/migraine-headache/symptoms-causes/syc-20360201",
				"doctor": "Dr. Feelgood",
			},
		],
		"prescriptions": [
			{
				"title": "Azathioprine",
				"dosage": "50mg",
				"form": "pill",
				"description": "Patient should take 200mg, or four pills, daily for Crohn's Disease. ",
				"notes": null,
				"prescription": 4,
				"prescriptionRemaining": 1,
				"info": "https://www.fass.se/LIF/product?userType=0&nplId=20050511000017",
				"doctor": "Dr. Feelgood",
			},
			{
				"title": "Cortiment",
				"dosage": "9mg",
				"form": "tablet",
				"description": "Patient should take 9mg, or one pill, daily for Crohn's Disease. ",
				"notes": null,
				"prescription": 4,
				"prescriptionRemaining": 3,
				"info": "https://www.fass.se/LIF/product?userType=0&nplId=20140405000046",
				"doctor": "Dr. Feelgood",
			},
			{
				"title": "Citodon",
				"dosage": "500mg/30mg",
				"form": "pill",
				"description":
					"Patient should take 500mg/30mg, or one pill, on first symptoms of Migraine. ",
				"notes": null,
				"prescription": 3,
				"prescriptionRemaining": 0,
				"info": "https://www.fass.se/LIF/product?userType=0&nplId=19820312000059",
				"doctor": "Dr. Feelgood",
			},
			{
				"title": "Naproxen Mylan",
				"dosage": "500mg",
				"form": "pill",
				"description": "Patient should take 500mg, or one pill, on first symptoms of Migraine. ",
				"notes": null,
				"prescription": 2,
				"prescriptionRemaining": 2,
				"info": "https://www.fass.se/LIF/product?userType=0&nplId=19870918000182",
				"doctor": "Dr. Feelgood",
			},
		],
		"doctorsNotes": [
			{
				"date": "01-Dec-2020",
				"title": "Showing signs of improvement",
				"for": "Crohn's Disease",
				"description": "Patient is showing signs of improvement. Will continue prescribed dosage.",
				"doctor": "Dr. Feelgood",
			},
			{
				"date": "01-Dec-2020",
				"title": "Notes from latest visit",
				"for": "Annual Check-up",
				"description": "Except for previous Crohn's diagnose patient is healthy.",
				"doctor": "Dr. Feelgood",
			},
		],
		"appointments": [
			{
				"date": moment().format("Do MMM, h:mm a"),
				"title": "Quarterly check-up",
				"hospital": "St. Adams Hospital",
				"description":
					"Quarterly check-up to control nutrition and medical development. Please leave a blood test at your nearest lab atleast two weeks before your appointment",
			},
			{
				"date": moment().format("Do MMM, h:mm a"),
				"title": "Bloodtest results",
				"hospital": "St. Adams Hospital",
				"description":
					"Bloodtest check-up to control blood levels. Please leave a blood test at your nearest lab atleast two weeks before your appointment",
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

router.post("/userLogin", async (req, res) => {
	const rawData = await mongo.db();
	let user = await queries.getUser(rawData, req.query.username);

	try {
		if (await bcrypt.compare(req.body.password, user[0].password)) {
			res.status(205).send("Success in routes");
		} else {
			res.status(500).send("Not allowed in routes");
		}
	} catch {
		res.status(500).send("Oh no in routes");
	}
});

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
