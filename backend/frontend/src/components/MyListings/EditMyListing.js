import React, { useState, useEffect } from "react";import "../../CSS/styles.css";
import { Card, Button, Container, Col, Row} from "react-bootstrap";
import MyListing from "./MyListing";
import MyListingPost from "./MyListingPost";
import axios from 'axios';


function EditMyListing({ image_old, price_old, title_old, description_old, category_old, item_id }) {
    const [new_title, setTitle] = useState(title_old);
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
    const handlePriceChange = (e) => {
        setPrice(e.target.value);    //set the price to the target value when typed in
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);    //set the category to the target value when typed in
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);    //set the description to the target value when typed in
    };
    const handleSubmit = async () => {

        setIsEditing(false);


        const postData = {
            user_id: userID,
            title: new_title,
            description: new_description,
            category: new_category,
            price: new_price,
            sold_flag: false,
            selling_price: 0,
            image: null
            
        };

        try {

            console.log(postData)
 
            await axios.put(`/api/update-item/${item_id}`, postData);
    
        } catch (error) {
            console.error('Error updating item:', error);
        }

        
        
    }; 


    return (
        <>    
        
        {isEditing ? (
            <Container className="listing-container" style={{maxWidth: '66rem', marginInlineEnd: '25rem', marginLeft:'2 0%'}}>
            <Row>
                <Row>
                    <div className="form-group" style={{width:'24rem'}}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" 
                        defaultValue={title_old} 
                        onChange={handleTitleChange} />   {/*this is to change the title*/}
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
                    defaultValue={description_old}
                    onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                    <Button variant="outline-primary" 
                    style={{ marginRight: '20px', marginBottom:'5px' }}
                    onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </Row>
            </Container>
         ) : (
            <MyListingPost image={null}
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