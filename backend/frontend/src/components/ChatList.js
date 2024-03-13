import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate(); // Initialize navigate
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString); // Parse the string into a JavaScript object
  const userId = userData[Object.keys(userData)[0]]; // Access the user ID

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

  const handleChatClick = (chatId,other_person_username) => {
    navigate(`${chatId}/${other_person_username}`); // Remove colon from the path
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
        {/* Add padding-top to accommodate fixed header */}
        <div className="container">
          {chats.map((chat) => (
            <div
              key={chat.chat_id}
              className="chat-row"
              style={{
                cursor: "pointer",
                backgroundColor: "#f0f0f0",
                padding: "20px", // Reduce padding for smaller size
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                marginBottom: "15px", // Reduce margin for smaller size
                fontSize: "24px", // Reduce font size
              }}
              onClick={() => handleChatClick(chat.chat_id,chat.other_person_username)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#c3d8f0"; // Change background color to blue on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f0f0"; // Restore original background color on hover out
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                {chat.other_person_username}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;