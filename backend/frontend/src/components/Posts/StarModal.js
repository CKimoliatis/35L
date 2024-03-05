import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function ConfirmationModal({ show, onHide, itemTitle }) {

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleAddWatchlist = () => {
        onHide(); // Close the modal
        //add logic to add to watchlist model
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
        <Modal.Title>Add Item to watchlist?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        <Button variant="primary" onClick={handleAddWatchlist}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
