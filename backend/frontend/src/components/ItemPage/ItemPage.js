import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../NavigationBar";
import "./ItemPage.css";

const ItemPage = () => {
  const { encodedData } = useParams();
  const decodedData = JSON.parse(decodeURIComponent(encodedData));

  const navigate = useNavigate();
  const image = decodedData["itemImage"];
  const price = decodedData["itemPrice"];
  const title = decodedData["itemTite"]; // Typo? Should it be "itemTitle"?
  const description = decodedData["itemDescription"];

  const [sellerData, setSellerData] = useState(null);
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get-specific-user", {
          params: { user_id: decodedData.seller_id },
        });
        console.log("Response from backend:", response.data); // Log response data
        setSellerData(response.data);
      } catch (error) {
        console.log("Error fetching seller data:", error);
      }
    };
  
    fetchSellerData();
  }, [decodedData.seller_id]);
  
  useEffect(() => {
    const fetchChatID = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get-new-chat-id");
        console.log(response.data);
        setChatId(response.data.chat_id);
      } catch (error) {
        console.log("Error fetching chat ID:", error);
      }
    };

    fetchChatID();
  }, []);

  const handleClick = () => {
    if (sellerData.first_name && chatId) {
      // Create a new chat
      const newChatResponse = axios.post("/api/create-chat", {
        user_id: decodedData.user_id,
        recipient_id: decodedData.seller_id,
      });

      // Navigate to the chat using the retrieved data
      navigate(`/chat/${chatId}/${sellerData.first_name}`);
    } else {
      console.log("Unable to create chat: Missing data");
    }
  };

  return (
    <div id="item-page-container">
      <NavigationBar />
      <br />
      <br />
      <br />
      <div id="main-container">
        <div id="item-page-image-container">
          <img id="item-page-image" src={image} alt={title} />
        </div>
        <div id="item-info-container">
          <div id="item-description-container">
            <h2>{title}</h2>
            <h3>${price}</h3>
            <br />
            <br />
            <p>{description}</p>
          </div>
          <div className="message-seller-container">
            <button className="message-seller" onClick={handleClick}>
              Message Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
