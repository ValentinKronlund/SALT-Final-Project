import React, { useContext } from "react";
import Context from "../../contexts/Context.js";
import { Icon } from "@iconify/react";
import bxMessageAdd from "@iconify/icons-bx/bx-message-add";

export default function Sidebar({ generateConversations, setChatOpened, setNewConversation }) {
	const userInfo = useContext(Context).userInfo;

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
