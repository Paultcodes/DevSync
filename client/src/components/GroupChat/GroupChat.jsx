import React from 'react';
import './ChatBox.css';
import { useEffect, useRef  } from 'react';

function ChatBox(props) {
  const chatBoxRef = useRef(null);

  useEffect(() => {
    chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, []);
  
  const messages = [
    {
      type: 'private',
      text: 'hello worl asdf lkajsdklfj lkasjdf',
      time: '12/34/34',
    },
    {
      type: 'private',
      text: 'hello worl asdf lkajsdklfj lkasjdf',
      time: '12/34/34',
    },
    {
      type: 'private',
      text: 'hello worl asdf lkajsdklfj lkasjdf',
      time: '12/34/34',
    },
    {
      type: 'private',
      text: 'hello worl asdf lkajsdklfj lkasjdf',
      time: '12/34/34',
    },
    {
        type: 'private',
        text: 'hello worl asdf lkajsdklfj lkasjdf',
        time: '12/34/34',
      },
      {
        type: 'private',
        text: 'hello worl asdf lkajsdklfj lkasjdf',
        time: '12/34/34',
      },
      {
        type: 'private',
        text: 'hello worl asdf lkajsdklfj lkasjdf',
        time: '12/34/34',
      },
      {
        type: 'private',
        text: 'hello worl asdf lkajsdklfj lkasjdf',
        time: '12/34/34',
      },
      {
        type: 'private',
        text: 'hello worl asdf lkajsdklfj lkasjdf',
        time: '12/34/34',
      },
      {
        type: 'private',
        text: 'hello worl asdf lkajsdklfj lkasjdf',
        time: '12/34/34',
      },
      {
        type: 'private',
        text: 'hello worl asdf lkajsdklfj lkasjdf',
        time: '12/34/34',
      },
      {
        type: 'private',
        text: 'hello worl asdf lkajsdklfj lkasjdf',
        time: '12/34/34',
      },
  ];

  return (
    <div className="chat-box">
      <div className="messages" ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <p className="text">{message.text}</p>
            <p className="time">{message.time}</p>
          </div>
        ))}
      </div>
      <div className="input">
        <input type="text" placeholder="Type your message here" />
        <button>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
