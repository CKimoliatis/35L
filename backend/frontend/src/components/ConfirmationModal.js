import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function ConfirmationModal({ show, onHide, itemTitle }) {

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleBrowseItems = () => {
    onHide(); // Close the modal
    navigate("/landing"); // Navigate to the Landing page
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
        <Modal.Title>Item successfully Posted!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`The item "${itemTitle}" has been successfully posted!`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleBrowseItems}>
          Browse Items
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
