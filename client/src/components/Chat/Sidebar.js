import React from "react";

export default function Sidebar() {
	return (
		<aside className="conversations">
			<p className="container-inner-title align-mid text-border-bottom">Messages</p>
			<div className="conversations-list">{generateConversations(userInfo.messages)}</div>
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
