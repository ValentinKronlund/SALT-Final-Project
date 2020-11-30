import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext.js";
import updateUser from "../../hooks/updateUser";
import axios from "axios";
import moment from "moment";

import Background from "../static/Background";
import Header from "../static/Header";
import Footer from "../static/Footer";
import Sidebar from "./Sidebar";

import "./chat.css";

const Chat = () => {
	const userInfo = useContext(UserContext).userInfo;
	const setUserInfo = useContext(UserContext).setUserInfo;

	const [chatOpened, setChatOpened] = useState(false);
	const [newConversation, setNewConversation] = useState(false);
	const [currentConversation, setCurrentConversation] = useState();
	const [message, setMessage] = useState("");
	const [recipientId, setrecipientId] = useState("");
	const [recipientUsername, setrecipientUsername] = useState("");

	const sendMessage = async (e) => {
		e.preventDefault();
		console.log("--- Sending message ---");

		const newMessage = {
			fromId: userInfo._id,
			from: userInfo.username,
			to: recipientUsername,
			messageObj: {
				timestamp: moment(),
				message,
			},
		};

		await axios
			.put("http://localhost:1337/api/mongoDB/messages", newMessage)
			.then((res) => console.log(res))
			.catch((err) => console.log(err, "<-- Error while sending message"));

		setMessage("");
		const fetchedUser = await updateUser();
		setUserInfo(fetchedUser);
	};

	useEffect(() => {
		let messages;
		if (userInfo.messages) {
			messages = userInfo.messages[recipientId];
		}
		setCurrentConversation(messages);
	}, [recipientId]);

	useEffect(() => {}, [userInfo]);

	const generateFeed = () => {
		let allMessagesSorted = [];
		if (currentConversation != null) {
			allMessagesSorted = currentConversation.messages.sort((a, b) => a.timestamp - b.timestamp);
		}
		return allMessagesSorted;
	};

	const generateChat = () => {
		const chatHeader = () => {
			if (newConversation) {
				return (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setNewConversation(false);
						}}>
						<input
							type="text"
							placeholder="Type username you would like to contact"
							value={recipientUsername}
							onChange={(e) => setrecipientUsername(e.currentTarget.value)}
							required
						/>
					</form>
				);
			} else {
				return (
					<p className="container-inner-title align-mid text-border-bottom">
						{userInfo.messages[recipientId]
							? userInfo.messages[recipientId].firstName
							: recipientUsername}
					</p>
				);
			}
		};

		return (
			<>
				{chatHeader()}
				<div className="chat-feed">
					{generateFeed().map((message, i) => (
						<div
							key={i}
							className={
								message.fromId === message.toId ? "msg-container sent" : "msg-container received"
							}>
							<p className="message-from">{message.from}</p>
							<p className="message-time">{moment(message.timestamp).format("MMM Do, hh:mm a")}</p>
							<p className="message">{message.message}</p>
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
			</>
		);
	};

	return (
		<>
			<Header />
			<Background />
			<main className="chat-main-container">
				<Sidebar
					setChatOpened={setChatOpened}
					setNewConversation={setNewConversation}
					setrecipientId={setrecipientId}
					setCurrentConversation={setCurrentConversation}
					setrecipientUsername={setrecipientUsername}
				/>
				{chatOpened ? <section className="chat">{generateChat()}</section> : null}
			</main>
			<Footer />
		</>
	);
};

export default Chat;
