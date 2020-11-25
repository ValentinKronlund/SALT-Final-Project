import React, { useState } from "react";

import "../styles/chat.css";
import "../styles/chat.css";

const Chat = () => {
	const [messages, setMessages] = useState();

	return (
		<div className="chat-container">
			<div className="chat-messages">
				<form className="msg-input" placeholder="Send Message">
					<input type="text" name="msg"></input>
				</form>
			</div>
		</div>
	);
};

export default Chat;
