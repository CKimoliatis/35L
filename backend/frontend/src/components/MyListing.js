import React, { useState } from "react";
import "../CSS/styles.css";
import NavigationBar from "./NavigationBar";
import "./UploadButton";
import YooniLogo from "../objects/YooniLogo.png";
import { Card, Button, Container, Col, Row} from "react-bootstrap";
import UploadButton from "./UploadButton";


const IsEditing=() => {
    const [editing, setEditing] = useState(true);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);    //set the title to the target value when typed in
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);   //set the description to the target value when typed in
    };
    

    return(
        <>
        {editing ? (
            <>
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
                    <Button variant="outline-primary" style={{ marginRight: '20px', marginBottom:'5px' }}>Submit</Button>
                </div>
            </>
        ) :(
            <h1>do whatever</h1>
        )
        }
        </>
    );
};

const MyListing = () => {

    const [editing, setEditing] = useState(null);
    const [userData, setUserData] = useState(null);

    /*useEffect(() => {
        // Retrieve userData from local storage
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
        // Parse the storedUserData if it exists
        setUserData(JSON.parse(storedUserData));
        }
        console.log(userData);
    }, []);*/


    return(
        <>
            <NavigationBar />
            <br />
            <br />
            <br />
            <Container className="listing-container" style={{maxWidth: '66rem', marginInlineEnd: '25rem', marginLeft:'2 0%'}}>
                <Row>
                    <Col style={{maxWidth:'16rem'}}>
                        <Card style={{ width: '15rem', padding: '10px'}}>
                            <Card.Img className="listing-img" src={YooniLogo} alt="Yooni Logo" />
                        </Card>
                        <UploadButton/>
                    </Col>
                    <Col>
                        <IsEditing />
                    </Col>
                </Row>    
            </Container>
        </>
    );

};

export default MyListing;

