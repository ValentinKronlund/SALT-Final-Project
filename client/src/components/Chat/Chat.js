import React, { useState, useContext } from "react";
import Context from "../../contexts/UserContext.js";
import axios from "axios";

import Background from "../static/Background";
import Header from "../static/Header";
import Footer from "../static/Footer";
import Sidebar from "./Sidebar";

import "./chat.css";

const Chat = () => {
	const userInfo = useContext(Context).userInfo;

	const [chatOpened, setChatOpened] = useState(false);
	const [newConversation, setNewConversation] = useState(false);
	const [currentConversation, serCurrentConversation] = useState();
	const [message, setMessage] = useState("");
	const [recipient, setRecipient] = useState("");

	const sendMessage = (e) => {
		e.preventDefault();
		console.log("--- Sending message ---");

		const newMessage = {
			from: userInfo.username,
			to: recipient,
			messageObj: {
				timestamp: Date.now(),
				message,
			},
		};

		axios
			.put("http://localhost:1337/api/mongoDB/messages", newMessage)
			.then((res) => console.log(res))
			.catch((err) => console.log(err, "<-- Error while sending message"));

		setMessage("");
	};

	const generateConversations = (userMessages) => {
		const correspondants = Object.keys(userMessages);
		const messageObject = Object.values(userMessages);
		const conversations = [];

		correspondants.forEach((corr, index) => {
			const latestReceived = messageObject[index].received[0];
			conversations.push(
				<div
					onClick={() => {
						setChatOpened(true);
						setRecipient(corr);
						serCurrentConversation(messageObject[index]);
					}}
					key={corr}
					className={
						latestReceived
							? latestReceived.read
								? "conversation read"
								: "conversation"
							: "conversation"
					}>
					<p className="corr-name">{corr}</p>
					<p className="msg-time">{latestReceived ? latestReceived.timestamp : null}</p>
					<p className="msg-preview">{latestReceived ? latestReceived.message : null}</p>
				</div>
			);
		});

		return conversations;
	};

	const generateFeed = () => {
		const allSent = currentConversation.sent;
		const allReceived = currentConversation.received;
		const allMessagesSorted = allSent.concat(allReceived).sort((a, b) => a.timestamp - b.timestamp);
		return allMessagesSorted;
	};

	const generateChat = () => {
		return (
			<div>
				<p className="container-inner-title align-mid text-border-bottom">{recipient}</p>
				<div className="chat-feed">
					{generateFeed().map((message, i) => (
						<div key={i} className="message">
							{message.message}
						</div>
					))}
				</div>
				<form className="msg-input" onSubmit={(e) => sendMessage(e)}>
					<textarea
						className="msg-textarea"
						name="message"
						placeholder="Write something... "
						value={message}
						onChange={(e) => setMessage(e.currentTarget.value)}
					/>
					<button className="msg-submit" type="submit">
						Send
					</button>
				</form>
			</div>
		);
	};

	return (
		<>
			<Header />
			<Background />
			<main className="chat-main-container">
				<Sidebar
					generateConversations={generateConversations}
					setChatOpened={setChatOpened}
					setNewConversation={setNewConversation}
				/>
				<section className="chat">{generateChat()}</section>
			</main>
			<Footer />
		</>
	);
};

export default Chat;
