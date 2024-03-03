import React from "react"
import "../../CSS/styles.css";
import { Card, Button, Container, Col, Row} from "react-bootstrap";


function EditMyListing(onSaveClick) {
    <Container className="listing-container" style={{maxWidth: '66rem', marginInlineEnd: '25rem', marginLeft:'2 0%'}}>
        <Row>
            <Row>
                <div className="form-group" style={{width:'24rem'}}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" placeholder="Add a title..." />
                </div>
                <div className="form-group" style={{width:'24rem'}}>
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" placeholder="$" />
                </div>
            </Row>
            <div className="form-group">
                <select id="category">
                <option disabled selected>
                    Select a category
                </option>
                <option>Clothing</option>
                <option>Sports</option>
                <option>Furniture</option>
                <option>Other</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                id="description"
                placeholder="Describe your item"
                ></textarea>
            </div>
            <div className="d-flex justify-content-end">
                <Button variant="outline-primary" 
                style={{ marginRight: '20px', marginBottom:'5px' }} 
                onClick={onSaveClick}>
                    Submit
                </Button>
            </div>
        </Row>
    </Container>
}

export default EditMyListing;