import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatList = ({ userId }) => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("/api/get-chats", {
          params: {
            user_id: userId,
          },
        });
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, [userId]);

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`); // Remove colon from the path
  };

  return (
    <div>
      <div
        className="header"
        style={{
          height: "80px",
          background: "#0098dc",
          position: "fixed",
          width: "100%",
          zIndex: "1000",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ color: "white" }}>Chat List</h1>
          <button
            className="btn btn-light"
            onClick={() => navigate("/landing")}
          >
            Back to Homepage
          </button>
        </div>
      </div>
      <div style={{ paddingTop: "80px" }}>
        {" "}
        {/* Add padding-top to accommodate fixed header */}
        <div className="container">
          <div className="row">
            {chats.map((chat) => (
              <div
                key={chat.chat_id}
                className="col-md-4 mb-3"
                onClick={() => handleChatClick(chat.chat_id)}
                style={{ cursor: "pointer" }}
              >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Chat ID: {chat.chat_id}</h5>
                    <p className="card-text">
                      Other Person: {chat.other_person_name}
                    </p>
                    <p className="card-text">Click to view messages</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
