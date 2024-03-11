import React, { useState, useEffect } from "react";
import "../../CSS/styles.css";
import { Card, Button, Container, Col, Row} from "react-bootstrap";
import NavigationBar from "../NavigationBar";
import MyListingPost from "./MyListingPost";
import EditMyListing from "./EditMyListing";
import Login from "../Login";
import "./MyListings.css"
//import { Card, Button, Container, Col, Row} from "react-bootstrap";
import axios from 'axios'

const IsEditing = ({showSold}) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [editingItemId, setEditingItemId] = useState(null);

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString); // Parse the string into a JavaScript object

  const handleEditClick = (itemId) => {
    setEditingItemId(itemId);
  };



  useEffect(() => {
    console.log(searchQuery);

    const fetchData = async () => {
      try {
        // Make a GET request to your backend endpoint
        const response = await axios.get("/api/myitems", {
          params: { searchQuery: userData.id }, // Pass searchQuery value directly
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log(searchQuery);
  }, [searchQuery]);

  return (
    <>

      {items.map((item) => (
        <MyListingPost
          key={item.id}
          image={item.image}
          price={item.price}
          title={item.title}
          description={item.description}
          category={item.category}
          item_id={item.id}
          sold_flag={item.sold_flag}
          show_sold = {showSold}
          is_editing={editingItemId === item.id}
          onEditClick={() => handleEditClick(item.id)}
        />
      ))}
    </>
  );
};

const MyListing = () => {

  const [showSold, setShowSold] = useState(false);

  const handleSoldButtonClick = () => {
    setShowSold(true); // Set showSold to true for sold items
  };

  const handleListingsButtonClick = () => {
    setShowSold(false); // Set showSold to false for current listings
  };

  return (
    <>
      <NavigationBar />
      <br />
      <br />
      <br />
      <Row>
      <Button variant="outline-warning" 
        style={{marginLeft:'5rem', marginTop: '5rem', display:'flex', width: '10rem' }} 
        onClick={() => handleSoldButtonClick()}>
            Sold Items
      </Button>
      <Button variant="outline-primary" 
        style={{marginLeft:'5rem', marginTop: '5rem', display:'flex', width: '10rem' }} 
        onClick={() => handleListingsButtonClick()}>
            Current Listings
      </Button>
      </Row>
      <br />
      <IsEditing showSold={showSold}/>
    </>
  );
};

export default MyListing;
