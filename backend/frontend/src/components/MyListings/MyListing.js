import React, { useState, useEffect } from "react";
import "../../CSS/styles.css";
import { Button, Row} from "react-bootstrap";
import NavigationBar from "../NavigationBar";
import MyListingPost from "./MyListingPost";
import "./MyListings.css"
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
          selling_price={item.selling_price}
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
      <br />
      <Row id='my-listings-header'>
      {/* <Button variant="outline-warning" 
        style={{marginLeft:'5rem', marginTop: '20px', display:'flex', width: '5rem' }} 
        onClick={() => handleSoldButtonClick()}>
            Sold Items
      </Button>
      <Button variant="outline-primary" 
        style={{marginLeft:'10px', marginTop: '20px', display:'flex', width: '5rem' }}
        onClick={() => handleListingsButtonClick()}>
            Current Listings
      </Button> */}
      { showSold && (
        <>
        <h2 id='sold-items' onClick={() => handleSoldButtonClick()} style={{borderBottom: '3px solid black'}}>Sold Items</h2>
        <h2 id='current-listings'onClick={() => handleListingsButtonClick()}>Current Listings</h2>
        </>
      )
      }
        
      { !showSold && (
        <>
        <h2 id='sold-items' onClick={() => handleSoldButtonClick()} >Sold Items</h2>
        <h2 id='current-listings'onClick={() => handleListingsButtonClick()} style={{borderBottom: '3px solid black'}}>Current Listings</h2>
        </>
      )}
      </Row>
      <br />
      <IsEditing showSold={showSold}/>
    </>
  );
};

export default MyListing;
