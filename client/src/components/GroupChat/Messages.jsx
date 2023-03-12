import React from "react";

export const Messages = ({ data }) => {
  return (
    <>
      {data.chatMessages.map(({ messageText, from, timestamp }) => (
        <div key={messageText}>
          <p style={{ fontWeight: "900" }}>{from}</p>
          <p className="text">{messageText}</p>
          <p className="time">{timestamp}</p>
        </div>
      ))}
    </>
  );
};

export default Messages;
