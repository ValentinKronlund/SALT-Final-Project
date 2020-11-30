import React, { useContext } from "react";
import Context from "../../contexts/UserContext.js";
import moment from "moment";
import { Icon } from "@iconify/react";
import bxMessageAdd from "@iconify/icons-bx/bx-message-add";

export default function Sidebar({
	setChatOpened,
	setNewConversation,
	setrecipientId,
	setrecipientUsername,
}) {
	const userInfo = useContext(Context).userInfo;

	const generateContacts = () => {
		const contactIds = Object.keys(userInfo.messages);
		const contactList = [];

		contactIds.forEach((contactId, index) => {
			const correlatedMessages = userInfo.messages[contactId].messages;
			contactList.push(
				<div
					onClick={() => {
						setChatOpened(true);
						setrecipientId(contactId);
						setrecipientUsername(userInfo.messages[contactId].username);
					}}
					key={contactId}
					className="conversation">
					<p className="contact-name">{`${userInfo.messages[contactId].firstName} ${userInfo.messages[contactId].lastName}`}</p>
					<p className="msg-time">
						{correlatedMessages
							? moment(correlatedMessages[0].timestamp).format("MMM Do, hh:mm a")
							: null}
					</p>
					<p className="msg-preview">
						{correlatedMessages ? correlatedMessages[correlatedMessages.length - 1].message : null}
					</p>
				</div>
			);
		});

		return contactList;
	};

	return (
		<aside className="conversations">
			<p className="container-inner-title align-mid text-border-bottom">Contacts</p>
			<div className="conversations-list">{generateContacts()}</div>
			<button
				type="button"
				className="new-conversation-button"
				onClick={() => {
					setChatOpened(true);
					setNewConversation(true);
				}}>
				<Icon icon={bxMessageAdd} style={{ color: "#ffffff", fontSize: "48px" }} />
			</button>
		</aside>
	);
}
