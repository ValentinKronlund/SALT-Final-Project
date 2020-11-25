import React, { useState } from "react";

import "../styles/chat.css";

const Chat = () => {
	const [message, setMessage] = useState("");
	const [recipient, setRecipient] = useState("");

	const sendMessage = (e) => {
		e.preventDefault();
		console.log("--- Message Sent! ---");
	};

	return (
		<div className="chat-container">
			<div className="chat-messages">
				<form className="msg-input" onSubmit={(e) => sendMessage(e)}>
					<fieldset>
						<legend>Send a message (dev)</legend>
						<label for="to">To - </label>
						<input
							type="text"
							name="recipient"
							onChange={(e) => setRecipient(e.currentTarget.value)}></input>
						<label for="msg">Message - </label>
						<input
							type="text"
							name="msg"
							placeholder="Send Message"
							onChange={(e) => setMessage(e.currentTarget.value)}></input>
					</fieldset>
					<button type="submit">Really send message?</button>
				</form>
			</div>
		</div>
	);
};

export default Chat;
