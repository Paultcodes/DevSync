import React from "react";
import "./ChatBox.css";
import { useEffect, useRef, useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../../utils/mutations";
import auth from "../../utils/auth";
import {} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { GroupDataContext } from "../../pages/GroupPage/GroupPage";

function ChatBox({ refetch }) {
  const messages = useContext(GroupDataContext);
  const chatBoxRef = useRef(null);
  const { groupId } = useParams();
  const [messageText, setMessageText] = useState("");

  const [createMessage, { error, data }] = useMutation(SEND_MESSAGE);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return;
    }

    try {
      await createMessage({
        variables: { messageText, groupId }
      });
      refetch();
      setMessageText("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setMessageText(e.target.value);
  };

  useEffect(() => {
    chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, []);

  return (
    <div className="chat-box">
      <div className="messages" ref={chatBoxRef}>
        {messages.chatMessages.map(({ messageText, from, timestamp }) => (
          <div key={messageText}>
            <p style={{ fontWeight: "900" }}>{from}</p>
            <p className="text">{messageText}</p>
            <p className="time">{timestamp}</p>
          </div>
        ))}
      </div>
      <div className="input">
        <input
          value={messageText}
          onChange={handleChange}
          type="text"
          placeholder="Type your message here"
        />
        <button onClick={handleSendMessage}>Send</button>
        <button onClick={() => refetch()}>🔃</button>
      </div>
    </div>
  );
}

export default ChatBox;
