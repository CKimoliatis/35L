import React from "react"
import "../../CSS/styles.css";
import { Card, Button, Container, Col, Row} from "react-bootstrap";
import YooniLogo from "../../objects/YooniLogo.png";
import UploadButton from "../UploadButton";



function MyListingPost({image, price, title, description, category, onEditClick}) {
    return (
        <Container className="listing-container" style={{maxWidth: '66rem', marginInlineEnd: '25rem', marginLeft:'2 0%'}}>
            <Row>
                <Col style={{maxWidth:'16rem'}}>
                    <Card style={{ width: '15rem', padding: '10px'}}>
                        <Card.Img className="listing-img" src={image} alt="Yooni Logo" />
                    </Card>
                    <UploadButton/>
                </Col>
                <Col>
                    <Row>
                        <div className="form-group" style={{width:'24rem'}}>
                            <div id="title">{title}</div>
                        </div>
                        <div className="form-group" style={{width:'24rem'}}>
                            <div id="price" >${price}</div>
                        </div>
                    </Row>
                
                    <div className="form-group">
                        <div id="selectedCategory">{category}</div>
                    </div>
                        <div className="form-group">
                        <div className="description">{description}</div>
                    </div>
                </Col>
            </Row>
            <div className="d-flex justify-content-end">
                <Button variant="outline-primary" 
                style={{ marginRight: '20px', marginBottom:'5px' }} 
                onClick={onEditClick}>
                    Edit
                </Button>
            </div>

        </Container>
    );
}

export default MyListingPost;