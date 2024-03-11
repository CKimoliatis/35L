import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function ConfimSignupModal({ show, onHide}) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogIn = () =>{
    navigate('/');
    onHide();
  }

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
        <Modal.Title>You Have Succesfully Registered!</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="primary" onClick={handleLogIn}>
          Log In 
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfimSignupModal;
