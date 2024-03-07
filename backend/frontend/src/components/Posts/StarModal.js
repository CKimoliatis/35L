import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios";

function StarModal({
  show,
  onHide,
  itemTitle,
  updateInWatchlist,
  inWatchlist,
  item_id,
}) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData && !userData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []); 

  const handleWatchlist = async () => {
    try {
        if (!inWatchlist) {
            await addToWatchlist(); // Call the addToWatchlist function if item is not in watchlist
            console.log("Item added to watchlist successfully");
        } else {
            await removeFromWatchlist(); // Call the removeFromWatchlist function if item is in watchlist
            console.log("Item removed from watchlist successfully");
        }
        onHide(); // Close the modal
        updateInWatchlist(!inWatchlist);
    } catch (error) {
        console.error("Error performing watchlist action:", error);
    }
};

  const addToWatchlist = async () => {
    try {
      const response = await axios.post("api/add-item-to-watchlist", {
        user_id: userData.id,
        item_id: item_id,
      });
      return response.data; // Returning the response data
    } catch (error) {
      throw new Error(error); // Rethrowing the caught error
    }
  };

  const removeFromWatchlist = async () => {
    try {
      const response = await axios.post("api/remove-from-watchlist", {
        user_id: userData.id,
        item_id: item_id,
      });
      return response.data; // Returning the response data
    } catch (error) {
      throw new Error(error); // Rethrowing the caught error
    }
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
        <Modal.Title>
          {inWatchlist
            ? `Remove ${itemTitle} from watchlist?`
            : `Add ${itemTitle} to watchlist?`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        <Button variant="primary" onClick={handleWatchlist}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StarModal;
