import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Chat.css";

const Chat = () => {
  const { chatId, otherPersonName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString); // Parse the string into a JavaScript object
  const userId = parseInt(userData[Object.keys(userData)[0]]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/chats/messages", {
          params: { chat_id: chatId },
        });
        const messagesData = response.data.map((message) => ({
          text: message.message_content,
          isUser: message.sender_id === userId,
        }));
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [chatId, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    const newMessageObj = {
      text: newMessage,
      isUser: true, // Assuming sent messages are always from the user
    };
    setMessages([...messages, newMessageObj]);

    try {
      await axios.post("/api/create-message", {
        sender_id: userId,
        message_content: newMessage,
        chat_id: chatId,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const navigateToChatList = () => {
    navigate("/chat");
  };

  return (
    <div>
      <div style={{ backgroundColor: "#0098dc", color: "white", padding: '10px' }} className="header-bar d-flex align-items-center ">
        <button
          className="back-button btn btn-light mr-3"
          onClick={navigateToChatList}
        >
          &larr; Back
        </button>
        <div
          className="text-center"
          style={{ paddingLeft: "25px", paddingTop: "5px" }}
        >
          <h2 className="person-name text-light ml-2">{otherPersonName}</h2>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-container ${
                message.isUser ? "user" : "other"
              }`}
            >
              <div
                className={`message ${
                  message.isUser ? "user-message" : "other-message"
                }`}
                style={{
                  backgroundColor: message.isUser ? "light-blue" : "light-gray",
                  maxWidth: message.isUser
                    ? "calc(100% - 20px)"
                    : "calc(70% - 20px)",
                  marginLeft: message.isUser ? "auto" : "0",
                  marginRight: message.isUser ? "0" : "auto",
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
    </div>
  );
};

export default Chat;
