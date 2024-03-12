import React, { useState, useEffect } from "react";
import "../../CSS/styles.css";
import { Card, Button, Container, Col, Row} from "react-bootstrap";
import MyListingPost from "./MyListingPost";
import UploadButton from "../UploadButton";
import axios from 'axios';


function EditMyListing({ image_old, price_old, title_old, description_old, category_old, item_id }) {
    const [new_title, setTitle] = useState(title_old);
    const [newImage, setImage] = useState(image_old);
    const [new_description, setDescription]=useState(description_old);
    const [new_price, setPrice] = useState(price_old);
    const [new_category, setCategory]=useState(category_old);
    const [isEditing, setIsEditing] = useState(true);


    const userDataString = localStorage.getItem("userData"); 
    const userData = JSON.parse(userDataString); // Parse the string into a JavaScript object
    const userID = userData.id;

    const handleTitleChange = (e) => {
        setTitle(e.target.value);    //set the title to the target value when typed in
    };
    const handleImageChange = async (file) => {
        setImage(file);    //set the image to the target value when typed in

        const formData = new FormData();
        formData.append('user_id', userID);
        formData.append('title', new_title);
        formData.append('price', new_price);
        formData.append('category', new_category);
        formData.append('description', new_description);
        formData.append('image', file); 

        try {
            await axios.put(`/api/update-item/${item_id}`, formData);
    
        } catch (error) {
            throw('Error updating item:', error);
        }
    };
    const handlePriceChange = (e) => {
        setPrice(e.target.value);    //set the price to the target value when typed in
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);    //set the category to the target value when typed in
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);    //set the description to the target value when typed in
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/delete-item/${item_id}`);
        } catch (error) {
            throw('Error deleting item:', error);
        }

        window.location.reload();        

    }

    const handleSubmit = async () => {

        setIsEditing(false);

        const postData = {
            'user_id':userID,
            'title':new_title,
            'price':new_price,
            'category':new_category,
            'description':new_description,
        }

        try {
            await axios.put(`/api/update-item/${item_id}`, postData);
        } catch (error) {
            throw('Error updating item:', error);
        }

        window.location.reload();
        
    }; 


    return (
        <>    
        
        {isEditing ? (
            <Container className="listing-container" style={{maxWidth: '66rem', marginInlineEnd: '25rem', marginLeft:'2 0%'}}>
            <Row>
                <Col style={{maxWidth:'16rem'}}>   
                    <Card style={{ width: '15rem', padding: '10px'}}>
                        <Card.Img className="listing-img" src={image_old} />
                    </Card>
                    <UploadButton onFileSelect={handleImageChange}/>
                </Col>
                <Col>
                    <Row>
                        <div className="form-group" style={{width:'24rem'}}>
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" 
                            defaultValue={title_old} 
                            onChange={handleTitleChange} />   
                        </div>
                        <div className="form-group" style={{width:'24rem'}}>
                            <label htmlFor="price">Price</label>
                            <input type="text" id="price" defaultValue={price_old} onChange={handlePriceChange} />
                        </div>                  
                    </Row>
                    <div className="form-group" onChange={handleCategoryChange}>
                        <select id="category">
                        <option disabled selected>
                            Select a category
                        </option>
                        <option value="Clothing">Clothing</option>
                        <option value="Sports">Sports</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Home Goods">Home Goods</option>
                        <option value="Office Supplies">Office Supplies</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Music">Music</option>
                        <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                        id="description"
                        defaultValue={description_old}
                        onChange={handleDescriptionChange}
                        ></textarea>
                    </div>
                </Col>
                <div className="d-flex justify-content-end">
                    <Button variant="outline-danger" 
                    style={{ marginRight: '20px', marginBottom:'5px' }}
                    onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="outline-primary" 
                    style={{ marginRight: '20px', marginBottom:'5px' }}
                    onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </Row>
            </Container>
         ) : (
            <MyListingPost image={newImage}
                price={new_price}
                title={new_title}
                description={new_description}
                category={new_category}
                is_editing={isEditing}
                onEditClick={() => setIsEditing(true)}/>
        )} 
    </>

    );
}

export default EditMyListing;