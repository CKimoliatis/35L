import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css";

const Chat = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chats/${chatId}/messages`); // Update endpoint to fetch messages for specific chat
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [chatId]); // Fetch messages when chatId changes

  useEffect(() => {
    // Scroll to the bottom of the chat window when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const newMessageObj = {
      text: newMessage,
      isUser: true, // Assuming user's messages are on the right
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-container ${message.isUser ? "user" : "other"}`}
          >
            <div
              className={`message ${
                message.isUser ? "user-message" : "other-message"
              }`}
              style={{
                maxWidth: `${
                  message.isUser ? "calc(100% - 20px)" : "calc(70% - 20px)"
                }`,
                marginLeft: `${message.isUser ? "auto" : "0"}`,
                marginRight: `${!message.isUser ? "auto" : "0"}`,
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
