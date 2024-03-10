import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';


function ConfirmationModalListings({ show, onHide, item_id, new_title, new_category, new_price, new_description, userID }) {
  const [selling_price, setSellingPrice] = useState(0);

  const handleListItems = async () => {

    const postData = {
      'user_id':userID,
      'title':new_title,
      'price':new_price,
      'category':new_category,
      'description':new_description,
      'selling_price':selling_price,
      'sold_flag':true
  }

    try {
        await axios.put(`/api/update-item/${item_id}`, postData);
        onHide(); // Close the modal
        window.location.reload();        

    } catch (error) {
        throw('Error updating item:', error);
    }
      
  };

  const handleSellingPriceChange = (e) => {

    setSellingPrice(e.target.value);

    
  };

  return (
    <Modal
      centered
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>How much did you sell it for?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
      <input type="text" id="selling_price" onChange={handleSellingPriceChange} />
        <Button variant="primary" onClick={handleListItems}>
          Sold!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModalListings;
